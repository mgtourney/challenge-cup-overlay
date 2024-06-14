<script lang="ts">
    export let teamNumber: number;
</script>

<div class="flex flex-col bg-purple rounded-2xl px-12 py-8 bg-opacity-80">
    <img src="/badge_{teamNumber}.png" class="h-[120px] w-[320px]" alt="badge"/>     

    <div class="flex flex-row items-center gap-2 px-4 py-4">
        <img src="https://via.placeholder.com/50" class="h-[80px] aspect-square rounded-lg border-4 border-[#FFD700]" alt="cute" />
        <div class="font-extrabold text-4xl">Team Name</div>
    </div>

    <div class="ms-3 flex gap-3 flex-col mt-2">
        <div class="flex flex-row items-center">
            <div class="h-[30px] me-3 aspect-square">
                <img src="/Captain_Icon.png" class="h-full w-full" alt="cute"/>
            </div>
            <img src="https://via.placeholder.com/50" class="h-[60px] aspect-square rounded-lg mx-2" alt="cute"/>
            <div class="font-bold text-2xl">Player Name</div>
        </div>

        <div class="flex flex-row items-center">
            <div class="h-[30px] me-3 aspect-square" />
            <img src="https://via.placeholder.com/50" class="h-[60px] aspect-square rounded-lg mx-2" alt="cute"/>
            <div class="font-bold text-2xl">Player Name</div>
        </div>

        <div class="flex flex-row items-center">
            <div class="h-[30px] me-3 aspect-square" />
            <img src="https://via.placeholder.com/50" class="h-[60px] aspect-square rounded-lg mx-2" alt="cute"/>
            <div class="font-bold text-2xl">Player Name</div>
        </div>
    </div>
</div>