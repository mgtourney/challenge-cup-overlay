<script lang="ts">
	import { TeamTypes, type ApiTeams, type Team } from "$lib/types";

    export let teams: ApiTeams;
</script>

<div class="flex flex-row justify-center items-center mt-4">
    <img class="h-[80px] aspect-square rounded-lg border-red border-2 me-4" src={teams.red_icon} alt="team icon" />
    <div class="bg-red text-4xl flex flex-row font-medium text-white items-center h-[55px] rounded-2xl ps-4 w-[700px] justify-end">
        {teams.red_name}
        <div class="bg-[#b50a0f] font-extrabold text-5xl ms-2 h-full px-3 rounded-2xl text-center flex items-center justify-center">{teams.red_score}</div>
    </div>

    <img src="/BSCC2024_Logo.png" alt="logo" class="h-[100px] w-[100px] mx-4" />

    <div class="bg-purple text-4xl flex flex-row font-medium text-white items-center h-[55px] rounded-2xl pe-4 w-[700px]">
        <div class="bg-[#931bb1] font-extrabold text-5xl me-2 h-full px-3 rounded-2xl text-center flex items-center justify-center">{teams.purple_score}</div>
        {teams.purple_name}
    </div>
    <img class="h-[80px] aspect-square rounded-lg border-purple border-2 ms-4" src={teams.purple_icon} alt="team icon" />
</div>