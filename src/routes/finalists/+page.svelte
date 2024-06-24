<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
    import TeamCard from '$lib/components/TeamCard.svelte';
	import { onDestroy, onMount } from 'svelte';

    export let data;

    let teams = data.props.teams;
    let players = data.props.players;

    let winners = {
        first: "",
        second: "",
        third: ""
    };

    let firstPlaceTeam;
    let secondPlaceTeam;
    let thirdPlaceTeam;

    let firstPlacePlayers = [];
    let secondPlacePlayers = [];
    let thirdPlacePlayers = [];

    $: firstPlaceTeam = teams.find(team => team.id === winners.first);
    $: secondPlaceTeam = teams.find(team => team.id === winners.second);
    $: thirdPlaceTeam = teams.find(team => team.id === winners.third);
    
    $: firstPlacePlayers = players.filter(player => player.team === winners.first).sort((a, b) => a.captian || b.captian ? 0 : -1);
    $: secondPlacePlayers = players.filter(player => player.team === winners.second).sort((a, b) => a.captian || b.captian ? 0 : -1);
    $: thirdPlacePlayers = players.filter(player => player.team === winners.third).sort((a, b) => a.captian || b.captian ? 0 : -1);

    const updateWinners = () => {
        fetch(`${PUBLIC_API_URL}/winners`)
            .then(res => res.json())
            .then(data => {
                if (data.first) winners.first = data.first;
                if (data.second) winners.second = data.second;
                if (data.third) winners.third = data.third;
            });
    }

    let interval: any;
    onMount(() => {
        updateWinners();
        interval = setInterval(() => {
            updateWinners();
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div class="h-screen w-screen bg-grey flex flex-col text-white">
    <!-- Logo -->
    <div class="flex flex-col items-center px-4 py-10">
        <img src="/BSCC2024_Logo.png" class="h-[300px] w-[300px] justify-center" alt="logo"/>
        <img src="/BSCC2024_text.png" class="h-[200px] w-[430px] justify-center mt-[-247px]" alt="logo"/>
        <div class="flex w-full py-0 bottom-0 inset-x-0 text-white leading-4 justify-center font-extrabold text-5xl pt-[30px]">FINALISTS</div>
    </div>
    <!-- Cards -->
    <div class="flex flex-row justify-center items-center gap-16">
        {#if firstPlaceTeam}
            <TeamCard teamNumber={1} teamName={firstPlaceTeam.name} teamIcon={firstPlaceTeam.avatar} players={firstPlacePlayers}/>
        {/if}
        {#if secondPlaceTeam}
            <TeamCard teamNumber={2} teamName={secondPlaceTeam.name} teamIcon={secondPlaceTeam.avatar} players={secondPlacePlayers}/>
        {/if}
        {#if thirdPlaceTeam}
            <TeamCard teamNumber={3} teamName={thirdPlaceTeam.name} teamIcon={thirdPlaceTeam.avatar} players={thirdPlacePlayers}/>
        {/if}
    </div>

    <div class="flex flex-grow" />

    <!-- Footer -->
    <div class="flex w-full h-fit">
        <div class="flex flex-col justify-end items-center h-fit w-full">
            <p class="text-2xl font-bold"><span class="font-extrabold">ARTIST</span> - SONG NAME</p>
            <div class="flex flex-row items-center justify-center bg-red bg-opacity-50 rounded-t-2xl">
                <!-- <img src="https://reactive.fugi.tech/group?layer-name=Discord+Reactive+-+Group&layer-width=1920&layer-height=300" class="h-full w-fuull aspect-square rounded-lg" alt="cute"/> -->
                 <iframe src="https://reactive.fugi.tech/group?layer-name=Discord+Reactive+-+Group&layer-width=1920&layer-height=300" title="discord"></iframe>
            </div>
        </div>
    </div>
</div>