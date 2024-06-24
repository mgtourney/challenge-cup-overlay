<script lang="ts">
	import { getPlayerInfo, type webPlayer } from "$lib";

    export let teamNumber: number;

    export let teamName: string;
    export let teamIcon: string;

    export let players: {game_id: string, captian: boolean}[];

    let captain = players.find(player => player.captian)!;

    let teamPlayers = players.filter(player => !player.captian)!;

    let captianWeb: webPlayer;;
    getPlayerInfo(captain.game_id).then(data => {
        captianWeb = data!;
    });


    let p1: webPlayer;
    let p2: webPlayer;

    getPlayerInfo(teamPlayers[0].game_id).then(data => {
        p1 = data!;
    });

    getPlayerInfo(teamPlayers[1].game_id).then(data => {
        p2 = data!;
    });

    $: console.log(teamPlayers);
</script>

<div class="flex flex-col bg-purple rounded-2xl px-12 py-8 bg-opacity-80 w-[416px]">
    <img src="/badge_{teamNumber}.png" class="h-[120px] w-[320px]" alt="badge"/>     

    <div class="flex flex-row items-center gap-2 px-4 py-4 w-[320px] text-ellipsis">
        <img src="{teamIcon}" class="h-[80px] aspect-square rounded-lg border-4 border-[#FFD700]" alt="cute" />
        <div class="font-extrabold text-4xl text-nowrap truncate">{teamName}</div>
    </div>

    <div class="ms-3 flex gap-3 flex-col mt-2">
        {#if captianWeb}
            <div class="flex flex-row items-center">
                <div class="h-[30px] me-3 aspect-square">
                    <img src="/Captain_Icon.png" class="h-full w-full" alt="cute"/>
                </div>
                <img src={captianWeb.avatar} class="h-[60px] aspect-square rounded-lg mx-2" alt="cute"/>
                <div class="font-bold text-2xl text-nowrap truncatep">{captianWeb.name}</div>
            </div>
        {/if}

        {#if p1}
            <div class="flex flex-row items-center">
                <div class="h-[30px] me-3 aspect-square" />
                <img src={p1.avatar} class="h-[60px] aspect-square rounded-lg mx-2" alt="cute"/>
                <div class="font-bold text-2xl text-clip text-nowrap truncate">{p1.name}</div>
            </div>
        {/if}

        {#if p2}
            <div class="flex flex-row items-center">
                <div class="h-[30px] me-3 aspect-square" />
                <img src={p2.avatar} class="h-[60px] aspect-square rounded-lg mx-2" alt="cute"/>
                <div class="font-bold text-2xl text-nowrap truncate">{p2.name}</div>
            </div>
        {/if}
    </div>
</div>