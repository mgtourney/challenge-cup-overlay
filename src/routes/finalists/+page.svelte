<script lang="ts">
    import TeamCard from '$lib/components/TeamCard.svelte';
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
        {#each Array(3) as _, i}
            <TeamCard teamNumber={i + 1}/>
        {/each}
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