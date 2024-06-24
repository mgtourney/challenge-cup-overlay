<script lang="ts">
	import { PUBLIC_API_URL } from "$env/static/public";

	// import { currentMapPool } from "$lib";
	import ScoreBar from "$lib/components/ScoreBar.svelte";
    import { Difficulty, MapStatus, RoundType, TeamTypes, type Team, type Map, type ApiTeams } from "$lib/types";
	import { onDestroy, onMount } from "svelte";

    let maps: Map[] = [];
    let toggle: boolean = false;

    let teams: ApiTeams;

    let spotify = {
        artist: "Tyler, The Creator",
        title: "Song Name"
    }

    let round = {
        type: RoundType.Winners,
        number: 1,
    }

    // console.log(maps)

    const mapStatusToColor = (status: MapStatus) => {
        switch (status) {
            case MapStatus.Banned:
                return "border-banned"
            case MapStatus.Picked:
                return "border-picked"
            case MapStatus.Tiebreaker:
                return "border-selected"
            case MapStatus.None:
                return ""
        }
    }

    const updateCurrentPool = () => {
        fetch(`${PUBLIC_API_URL}/pool`)
                .then(res => res.json())
                .then(data => {
                    maps = data.maps;
                })
    }

    const updateTeam = () => {
        fetch(`${PUBLIC_API_URL}/teams`)
            .then(res => res.json())
            .then(data => {
                teams = data;
            })
    }

    const updateRound = () => {
        fetch(`${PUBLIC_API_URL}/round`)
            .then(res => res.json())
            .then(data => {
                round = {
                    type: data.is_winners ? RoundType.Winners : RoundType.Losers,
                    number: data.round_number
                }
            });
    }


    let interval: any;
    onMount(() => {
        updateCurrentPool();
        updateTeam();
        updateRound();
        interval = setInterval(() => {
            updateCurrentPool();
            updateTeam();
            updateRound();
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div class="flex flex-col bg-grey h-screen w-screen">
    {#key toggle}
        {toggle}
    {/key}

    {#if teams}
        <ScoreBar {teams} />
    {/if}

    <div class="flex items-center justify-center text-white font-bold text-5xl my-4">
        <p>MAP SELECTION</p>
    </div>

    <div class="border-t-2 border-white grid flex-col justify-center w-full pt-4">
        {#each maps as _, i}
            {#if i % 2 === 0}
                <div class="flex flex-row my-1">
                    <div class="flex flex-row bg-[#3E3E3E] h-[125px] me-8 rounded-2xl w-[600px] items-center { maps[i].pick_status === MapStatus.None ? "" : `border-4 ${mapStatusToColor(maps[i].pick_status)}` }">
                        <img class="h-[80px] aspect-square rounded-lg mx-2" src={maps[i].icon} alt="map icon" />
                        <div class="flex flex-col justify-center text-white me-4">
                            <p class="font-semibold">{maps[i].artist} - {maps[i].name}</p>
                            <p>Mapped by {maps[i].mapper}</p>
                        </div>
                        <div class="flex flex-grow" />
                        <div class="flex flex-col justify-end text-white h-full font-bold text-lg">
                            <div class="mt-2 me-2 rounded-lg bg-purple px-2 h-[33px] text-xl font-bold flex items-center justify-center ">{maps[i].diff}</div>
                            
                            <div class="flex flex-grow" />

                            <p>{maps[i].hex}</p>
                            <p class="mb-2">{maps[i].bpm}BPM</p>
                        </div>
                    </div>

                    {#if i+1 < maps.length}
                        <div class="flex flex-row bg-[#3E3E3E] h-[125px] ms-8 rounded-2xl w-[600px] items-center { maps[i + 1].pick_status === MapStatus.None ? "" : `border-4 ${mapStatusToColor(maps[i + 1].pick_status)}` }">
                            <img class="h-[80px] aspect-square rounded-lg mx-2" src={maps[i + 1].icon} alt="map icon" />
                            <div class="flex flex-col justify-center text-white me-4">
                                <p class="font-semibold">{maps[i + 1].artist} - {maps[i + 1].name}</p>
                                <p>Mapped by {maps[i + 1].mapper}</p>
                            </div>
                            <div class="flex flex-grow" />
                            <div class="flex flex-col justify-end text-white h-full font-bold text-lg">
                                <div class="mt-2 me-2 rounded-lg bg-purple px-2 h-[33px] text-xl font-bold flex items-center justify-center ">{maps[i + 1].diff}</div>
                                
                                <div class="flex flex-grow" />

                                <p>{maps[i + 1].hex}</p>
                                <p class="mb-2">{maps[i + 1].bpm}BPM</p>
                            </div>
                        </div>
                    {/if}
                </div>
            {/if}
        {/each}
    </div>
</div>

<div class="absolute bottom-0 left-0 ">
    <div class="h-[120px] w-[243px] bg-red bg-opacity-50 flex-row flex items-center justify-center rounded-tr-2xl">
        <img class="h-[70px] aspect-square rounded-lg me-4" src="https://via.placeholder.com/50" alt="team icon" />
        <img class="h-[70px] aspect-square rounded-lg ms-4" src="https://via.placeholder.com/50" alt="team icon" />
    </div>
</div>

<div class="absolute bottom-0 right-0 flex flex-row items-end">
    <div class="h-[38px] flex items-end justify-end flex-col me-4 mb-2 text-white text-3xl font-bold">
        <p><span class="font-extrabold">{spotify.artist} - </span>{spotify.title}</p>
    </div>
    <div class="bg-purple bg-opacity-50 h-[120px] w-[242px] flex flex-col items-center justify-center text-white rounded-tl-2xl text-3xl font-bold">
        <p>{round.type}</p>
        <p class="font-extrabold">Round {round.number}</p>
    </div>
</div>