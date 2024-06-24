<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
    import { PUBLIC_API_URL } from '$env/static/public';
	import type { ApiTeams } from '$lib/types';

    export let data;
    let teams = data.props.teams;
    let pools = data.props.pools;
    let players = data.props.players;

    let firstPlaceText = "";
    let secondPlaceText = "";
    let thirdPlaceText = "";

    let winners = {
        first: "",
        second: "",
        third: ""
    }

    let team1Text = "";
    let team2Text = "";

    let upcomingMatch = {
        team1_name: "",
        team2_name: ""
    }

    let isWinners = false;
    let roundNumber = "";

    let roundApiRes: any;

    const setTeamRed = (team_id: string, team_name: string, team_icon: string) => {
        let red_players = players.filter(player => player.team === team_id).map(player => player.game_id);
        fetch(`${PUBLIC_API_URL}/teams/red/${team_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: team_name, icon: team_icon, players: red_players})
        });
        updateApiTeams();
    }

    const setTeamPurple = (team_id: string, team_name: string, team_icon: string) => {
        let purple_players = players.filter(player => player.team === team_id).map(player => player.game_id);
        fetch(`${PUBLIC_API_URL}/teams/purple/${team_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: team_name, icon: team_icon, players: purple_players})
        });
        updateApiTeams();
    }

    const setScoreRed = (score: number) => {
        fetch(`${PUBLIC_API_URL}/teams/red/score/${score}`, {
            method: 'POST',
        });
        updateApiTeams();
    }

    const setScorePurple = (score: number) => {
        fetch(`${PUBLIC_API_URL}/teams/purple/score/${score}`, {
            method: 'POST',
        });
        updateApiTeams();
    }

    const setWinners = () => {
        fetch(`${PUBLIC_API_URL}/winners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ first: firstPlaceText, second: secondPlaceText, third: thirdPlaceText })
        });
        updateWinners();
    }

    const updateWinners = () => {
        fetch(`${PUBLIC_API_URL}/winners`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    if (data.first) winners.first = data.first;
                    if (data.second) winners.second = data.second;
                    if (data.third) winners.third = data.third;
                }
            });
    }

    const setUpcomingMatch = () => {
        fetch(`${PUBLIC_API_URL}/upcoming`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ team1_name: team1Text, team2_name: team2Text })
        });
        updateUpcomingMatch();
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

    const setRound = () => {
        fetch(`${PUBLIC_API_URL}/round`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  is_winners: isWinners, round_number: parseInt(roundNumber)})
        });
        updateRound();
    }

    const updateRound = () => {
        fetch(`${PUBLIC_API_URL}/round`)
            .then(res => res.json())
            .then(data => {
                roundApiRes = data;
            });
    }

    let api_teams: ApiTeams;

    const updateApiTeams = () => {
        fetch(`${PUBLIC_API_URL}/teams`)
            .then(res => res.json())
            .then(data => {
                api_teams = data;
            })
    }

    let interval: any;
    onMount(() => {
        updateApiTeams();
        updateWinners();
        updateUpcomingMatch();
        updateRound();
        interval = setInterval(() => {
            updateApiTeams();
            updateWinners();
            updateUpcomingMatch();
            updateRound();
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div class="flex flex-row bg-grey h-screen w-screen">
    <div class="flex flex-col text-white text-2xl">
        <p>Loaded Teams</p>
        {#each teams as team}
            <div class="flex flex-row items-center bg-gray-700 rounded-xl mx-4 mt-2">
                <img src={team.avatar} alt="team icon" class="h-8 w-8" />
                <p>{team.name}</p>
                <a href="/admin/team/{team.id}" class="mx-4">view players</a>
                <p class="text-[6px]">{team.id}</p>
                <button on:click={() => setTeamRed(team.id, team.name, team.avatar)} class="mx-4 bg-red rounded-xl">set red</button>
                <button on:click={() => setTeamPurple(team.id, team.name, team.avatar)} class="mx-4 bg-purple rounded-xl">set purple</button>
            </div>
        {/each}
    </div>
    <div class="flex flex-col text-white text-2xl">
        <p>Loaded Pools</p>
        {#each pools as pool}
            <div class="flex flex-row items-center bg-gray-700 rounded-xl mx-4 mt-4">
                <p>{pool.name}</p>
                <a href="/admin/pool/{pool.id}" class="mx-4">view pool</a>
            </div>
        {/each}
    </div>
    <div class="flex flex-col text-white text-lg">
        <p>Selected Teams</p>
        {#if api_teams}
            <div class="flex flex-row items-center bg-red bg-opacity-50 rounded-xl mx-4 mt-4 gap-1">
                <p>{api_teams.red_id}</p>
                <p>{api_teams.red_name}</p>
                <p>{api_teams.red_score}</p>
                <button class="h-[50px] w-[50px] bg-green-700 flex items-center justify-center font-extrabold text-4xl rounded-full" on:click={() => setScoreRed(api_teams.red_score + 1)}>+</button>
                <button class="h-[50px] w-[50px] bg-gray-800 flex items-center justify-center font-extrabold text-4xl rounded-full" on:click={() => setScoreRed(0)}>0</button>
                <button class="h-[50px] w-[50px] bg-red flex items-center justify-center font-extrabold text-4xl rounded-full" on:click={() => setScoreRed(api_teams.red_score - 1)}>-</button>
            </div>
            <div class="flex flex-row items-center bg-purple bg-opacity-70 rounded-xl mx-4 mt-4 gap-1">
                <p>{api_teams.purple_id}</p>
                <p>{api_teams.purple_name}</p>
                <p>{api_teams.purple_score}</p>
                <button class="h-[50px] w-[50px] bg-green-700 flex items-center justify-center font-extrabold text-4xl rounded-full" on:click={() => setScorePurple(api_teams.purple_score + 1)}>+</button>
                <button class="h-[50px] w-[50px] bg-gray-800 flex items-center justify-center font-extrabold text-4xl rounded-full" on:click={() => setScorePurple(0)}>0</button>
                <button class="h-[50px] w-[50px] bg-red flex items-center justify-center font-extrabold text-4xl rounded-full" on:click={() => setScorePurple(api_teams.purple_score - 1)}>-</button>
            </div>
        {/if}
        <div class="flex flex-grow" />
        <div class="flex flex-row border-b-black border-b-2">
            <p class="me-4">Round</p>
            <p class="me-2 text-[10px]">{JSON.stringify(roundApiRes)}</p>
            <p>IsWinners?</p>
            <input type="checkbox" class="ms-2" checked={isWinners} on:change={() => isWinners = !isWinners}>
            <input class="bg-gray-700 rounded-xl mx-4 w-[200px]" placeholder="round number" bind:value={roundNumber}>
            <button class="bg-green-600 rounded-xl mx-4" on:click={() => setRound()}>Set</button>
        </div>
        <div class="flex flex-row border-b-black border-b-2 my-2">
            <p>Upcomming Match</p>
            <div class="flex flex-col text-xs">
                <p>{upcomingMatch.team1_name}</p>
                vs
                <p>{upcomingMatch.team2_name}</p>
            </div>
            <input class="bg-gray-700 rounded-xl mx-4 w-[100px]" placeholder="team1 name" bind:value={team1Text}>
            <input class="bg-gray-700 rounded-xl mx-4 w-[100px]" placeholder="team2 name" bind:value={team2Text}>
            <button class="bg-green-600 rounded-xl mx-4" on:click={() => setUpcomingMatch()}>Set Match</button>
        </div>
        <div class="flex flex-col">
            <p>Winners</p>
            <p>first: {teams.filter(team => team.id === winners.first)[0]?.name}</p>
            <p>second: {teams.filter(team => team.id === winners.second)[0]?.name}</p>
            <p>third: {teams.filter(team => team.id === winners.third)[0]?.name}</p>
            <input class="bg-gray-700 rounded-xl mx-4 mt-4" placeholder="first place teamid" bind:value={firstPlaceText}>
            <input class="bg-gray-700 rounded-xl mx-4 mt-4" placeholder="second place teamid" bind:value={secondPlaceText}>
            <input class="bg-gray-700 rounded-xl mx-4 mt-4" placeholder="third place teamid" bind:value={thirdPlaceText}>
            <button class="bg-green-600 rounded-xl mx-4" on:click={() => setWinners()}>Set winners</button>
        </div>
    </div>
</div>