<script lang="ts">
    export let data;
    let teams = data.props.team;

    
</script>

<div class="flex flex-row bg-grey h-screen w-screen">
    <div class="flex flex-col text-white text-2xl">
        <p>Team Info</p>
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
        {/each}
    </div>
</div>