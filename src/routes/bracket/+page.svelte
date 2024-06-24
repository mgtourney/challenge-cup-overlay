<script lang="ts">
	import { PUBLIC_API_URL } from "$env/static/public";
    import { RoundType, TeamTypes, type Team } from "$lib/types";
	import { onDestroy, onMount } from "svelte";
    let upcomingMatch: { team1_name: string, team2_name: string } = { team1_name: "", team2_name: "" };

    let round = {
        type: RoundType.Winners,
        number: 1,
    }

    const updateUpcomingMatch = () => {
        fetch(`${PUBLIC_API_URL}/upcoming`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    upcomingMatch = data;
                }
            });
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
        updateUpcomingMatch();
        updateRound();
        interval = setInterval(() => {
            updateUpcomingMatch();
            updateRound();
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div class="flex flex-row bg-grey h-screen w-screen">
    <div class="flex flex-col w-[470px] bg-[#3E3E3E]">
        <div class="flex flex-col bg-red items-center justify-center rounded-b-xl text-white py-3 w-full">
            <p class="text-4xl font-medium mb-4">UPCOMING <span class="font-extrabold">MATCH</span></p>
            <p class="text-3xl font-medium text-center">{upcomingMatch.team1_name}</p>
            <p class="text-3xl font-bold">vs</p>
            <p class="text-3xl font-medium text-center">{upcomingMatch.team2_name}</p>
        </div>
        <div class="flex flex-grow flex-col items-center justify-center">
            <img class="h-[164.26px] w-[352.75px]" src="/BSCC2024_text.png" alt="logo_text" />
            <p class="text-5xl font-bold text-white">{round.type}</p>
            <p class="text-5xl font-extrabold text-white">ROUND {round.number}</p>
        </div>
        <div class="bg-purple h-[156px] flex flex-row items-center justify-center gap-[40px] rounded-t-xl">
            <img class="h-[90px] w-[90px] aspect-square rounded-lg" src="https://via.placeholder.com/50" alt="discord" />
            <img class="h-[90px] w-[90px] aspect-square rounded-lg" src="https://via.placeholder.com/50" alt="discord" />
        </div>
    </div>

    <iframe src="https://challonge.com/BSCC2024/module" width="100%" height="100%" frameborder="0" scrolling="auto" allowtransparency={true} title="bracket"/>
</div>