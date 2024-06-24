<script lang="ts">
	// import { currentMapPool } from '$lib';
	import { MapStatus, type MapPool } from '$lib/types';
    import { PUBLIC_API_URL } from '$env/static/public';
	import { onDestroy, onMount } from 'svelte';

    export let data;
    let pool = data.props.pool;
    let maps = data.props.maps;

    let currentPool: MapPool | null = null;

    const changeMapStatus = (mapHex: string, status: MapStatus) => {
        console.log(mapHex, " -> ", status);
        maps.find(map => map?.hex === mapHex)!.pick_status = status;

        if (currentPool?.id === pool.id) {
            let mp = {
                id: pool.id,
                name: pool.name,
                maps: maps.map(map => map!)
            }

            fetch(`${PUBLIC_API_URL}/pool`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mp)
            });
        }

        maps = maps;
    }

    const isPoolSelected = (): boolean => {
        if (currentPool?.id === pool.id) {
            return true;
        }
        return false;
    }

    const selectPool = () => {
        let mp = {
            id: pool.id,
            name: pool.name,
            maps: maps.map(map => map!)
        }

        let body = JSON.stringify(mp);

        fetch(`${PUBLIC_API_URL}/pool`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then(_ => updateCurrentPool());
    }

    const updateCurrentPool = () => {
        fetch(`${PUBLIC_API_URL}/pool`)
                .then(res => res.json())
                .then(data => {
                    currentPool = data;
                    if (currentPool?.id === pool.id) {
                        maps = currentPool.maps;
                    }
                })
    }

    $: console.log(currentPool);

    let interval: any;
    onMount(() => {
        updateCurrentPool();
        interval = setInterval(() => {
            updateCurrentPool();
        }, 5000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div class="flex flex-row bg-grey h-screen w-screen">
    <div class="flex flex-col text-white text-2xl">
        <!-- <p>Team Info</p>
        <div class="flex flex-row items-center bg-gray-700 rounded-xl mx-4 mt-4">
            <img src={teams.avatar} alt="team icon" class="h-8 w-8" />
            <p>{teams.name}</p>
        </div>
        <p>Players</p>
        {#each teams.players as player}
            <div class="flex flex-row items-center bg-gray-700 rounded-xl mx-4 mt-4 gap-4">
                <p>{player.game_id}</p>
                <p>{player.name}</p>
            </div>
        {/each} -->
        <p>Pool Info</p>
        <div class="flex flex-row items-center bg-gray-700 rounded-xl mx-4 mt-4 gap-4">
            <p>{pool.name}</p>
            {#key currentPool}
                <p>selected?: {isPoolSelected()}</p>
            {/key}
            <button class="bg-green-600 rounded-xl" on:click={() => selectPool()}>Select Pool</button>
        </div>
        <p>Maps</p>
        {#each maps as map}
            <div class="bg-gray-700 rounded-xl mx-4 mt-4 flex flex-row gap-4">
                <img src={map?.icon}  class="h-[50px] w-[50px]" alt="map_icon"/>
                <p>{map?.name}</p>
                <p>Status : {map?.pick_status}</p>
                <button class="bg-green-600 rounded-xl" on:click={() => changeMapStatus(map?.hex ?? "", MapStatus.Picked)}>Pick</button>
                <button class="bg-red rounded-xl" on:click={() => changeMapStatus(map?.hex ?? "", MapStatus.Banned)}>Ban</button>
                <button class="bg-purple rounded-xl" on:click={() => changeMapStatus(map?.hex ?? "", MapStatus.Tiebreaker)}>Set as TB</button>
                <button class="bg-gray-900 rounded-xl" on:click={() => changeMapStatus(map?.hex ?? "", MapStatus.None)}>None</button>
            </div>
        {/each}
    </div>
</div>