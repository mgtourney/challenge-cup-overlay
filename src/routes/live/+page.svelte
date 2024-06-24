<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import { getPlayerInfo } from '$lib';
	import ScoreBar from '$lib/components/ScoreBar.svelte';
	import { RoundType, TeamTypes, type ApiTeams, type Team } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';

    let teams: ApiTeams;


	// let red_players = [
	// 	{
	// 		name: 'Player name',
	// 		icon: 'https://via.placeholder.com/50',
	// 		acc: 99.99,
	// 		misses: 0,
    //         score: 100000
	// 	},
	// 	{
	// 		name: 'Player name',
	// 		icon: 'https://via.placeholder.com/50',
	// 		acc: 99.99,
	// 		misses: 0,
    //         score: 100000
	// 	}
	// ];
	let red_players: {name: string, icon: string, acc: number, misses: number, score: number}[] = []

	$: {
		for (let player in teams.red_players) {
			getPlayerInfo(player).then(data => {
				red_players.push({
					name: data!.name,
					icon: data!.avatar,
					acc: 99.99,
					misses: 0,
					score: 100000
				})
			})
		}
	}

	let purple_players = [
		{
			name: 'Player name',
			icon: 'https://via.placeholder.com/50',
			acc: 99.99,
			misses: 0,
            score: 500000
		},
		{
			name: 'Player name',
			icon: 'https://via.placeholder.com/50',
			acc: 99.99,
			misses: 0,
            score: 300000
		}
	];

    let total_scores = {
        red: red_players.reduce((score, player) => score + player.score, 0),
        purple: purple_players.reduce((score, player) => score + player.score, 0)
    }
    let total_misses = {
        red: red_players.reduce((misses, player) => misses + player.misses, 0),
        purple: purple_players.reduce((misses, player) => misses + player.misses, 0)
    }

    $: {
        total_scores = {
            red: red_players.reduce((score, player) => score + player.score, 0),
            purple: purple_players.reduce((score, player) => score + player.score, 0)
        }
        total_misses = {
            red: red_players.reduce((misses, player) => misses + player.misses, 0),
            purple: purple_players.reduce((misses, player) => misses + player.misses, 0)
        }
    }

    let spotify = {
        artist: "Tyler, The Creator",
        title: "Song Name"
    }

    let round = {
        type: RoundType.Winners,
        number: 1,
    }

    const addCommas = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	const updateTeam = () => {
        fetch(`${PUBLIC_API_URL}/teams`)
            .then(res => res.json())
            .then(data => {
                teams = data;
            })
    }

    let interval: any;
    onMount(() => {
        updateTeam();
        interval = setInterval(() => {
            updateTeam();
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div class="flex flex-col bg-grey h-screen w-screen">
	{#if teams}
		<ScoreBar {teams} />
	{/if}

	<div class="flex flex-row justify-center items-center mt-8">
		<div class="flex flex-col bg-red bg-opacity-50 p-[15px] rounded-s-lg">
			{#each red_players as player}
				<div class="flex flex-col mt-[-69px]">
					<div class="relative top-[88px] left-[17.5px]">
						<div class="flex flex-col text-white">
							<div class="flex flex-row items-center gap-2">
								<img class="h-[45px] w-[45px] rounded-lg" src={player.icon} alt="player icon" />
								<p class="font-extrabold text-2xl">{player.name.toUpperCase()}</p>
							</div>
							<div class="flex flex-row font-bold font-2xl gap-2">
								<p>{player.acc}%</p>
								<p class="text-red font-extrabold">{player.misses}x</p>
							</div>
						</div>
					</div>
					<div class="bg-[#009933] h-[360px] w-[640px]" />
				</div>
			{/each}
            {#if total_scores.red > total_scores.purple}
                <div class="flex flex-col items-end w-full mt-4">
                    <div class="h-[48px] flex justify-end items-end">
                        <p class="text-5xl text-white font-extrabold h-[55px]">{total_misses.red}x</p>
                    </div>
                    <p class="font-bold text-opacity-75 text-white text-2xl">{addCommas(total_scores.red)}</p>
                </div>
            {:else}
                <div class="flex flex-col items-end w-full mt-4">
                    <div class="h-[48px] flex justify-end items-end">
                        <p class="text-2xl text-white font-bold">{total_misses.red}x</p>
                    </div>
                    <p class="font-bold text-opacity-75 text-white text-2xl">{addCommas(total_scores.red)}</p>
                </div>
            {/if}
		</div>

		<div class="flex flex-col bg-purple bg-opacity-50 p-[15px] rounded-e-lg">
			{#each purple_players as player}
				<div class="flex flex-col mt-[-69px]">
					<div class="relative top-[88px] right-[17.5px]">
						<div class="flex flex-col text-white">
							<div class="flex flex-row-reverse items-center gap-2">
								<img class="h-[45px] w-[45px] rounded-lg" src={player.icon} alt="player icon" />
								<p class="font-extrabold text-2xl">{player.name.toUpperCase()}</p>
							</div>
							<div class="flex flex-row-reverse font-bold font-2xl gap-2">
								<p>{player.acc}%</p>
								<p class="text-red font-extrabold">{player.misses}x</p>
							</div>
						</div>
					</div>
					<div class="bg-[#009933] h-[360px] w-[640px]" />
				</div>
			{/each}
            {#if total_scores.red < total_scores.purple}
                <div class="flex flex-col w-full mt-4">
                    <div class="h-[48px] flex justify-start items-end">
                        <p class="text-5xl text-white font-extrabold">{total_misses.purple}x</p>
                    </div>
                    <p class="font-bold text-opacity-75 text-white text-2xl">{addCommas(total_scores.purple)}</p>
                </div>
            {:else}
                <div class="flex flex-col w-full mt-4">
                    <div class="h-[48px] flex justify-start items-end">
                        <p class="text-2xl text-white font-bold">{total_misses.red}x</p>
                    </div>
                    <p class="font-bold text-opacity-75 text-white text-2xl">{addCommas(total_scores.purple)}</p>
                </div>
            {/if}
		</div>
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