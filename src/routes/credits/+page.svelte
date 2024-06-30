<script lang="ts">
    import StaffCard from '$lib/components/StaffCard.svelte';
</script>

<div class="h-screen w-screen bg-grey flex flex-col text-white">
    <!-- Logo -->
    <div class="flex flex-col items-center px-4 py-10">
        <img src="/BSCC2024_Logo.png" class="h-[300px] w-[300px] justify-center" alt="logo"/>
        <img src="/BSCC2024_text.png" class="h-[200px] w-[430px] justify-center mt-[-247px]" alt="logo"/>
        <div class="flex w-full py-0 bottom-0 inset-x-0 text-white leading-4 justify-center font-extrabold text-6xl pt-[30px]">STAFF TEAM</div>
    </div>
    

    <div class="flex flex-row justify-center items-center text-center gap-16">
        <!-- Organizers-->
        <div class="flex flex-col bg-purple rounded-2xl px-12 py-8 bg-opacity-80 w-[375px]">
            <div class="flex flex-row justify-center items-center text-center">

                <div class="font-extrabold text-5xl text-center pb-4">ORGANIZERS</div>
            </div>
        
            <div class="flex flex-col justify-center items-center text-center">
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="h-[30px] me-3 aspect-square">
                        <img src="/Captain_Icon.png" class="h-full w-full" alt="cute"/>
                    </div>
                    <div class="font-bold text-4xl py-1">niko</div>
                </div>
        
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">teknoz</div>
                </div>
        
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">Flak</div>
                </div>
            </div>
        </div>
        <!--Map Poolers-->
        <div class="flex flex-col bg-purple rounded-2xl px-12 py-8 bg-opacity-80 w-[400px]">
            <div class="flex flex-row justify-center items-center text-center">

                <div class="font-extrabold text-5xl text-center pb-4">MAP POOLERS</div>
            </div>
        
            <div class="flex flex-col justify-center items-center text-center">
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="h-[30px] me-3 aspect-square">
                        <img src="/Captain_Icon.png" class="h-full w-full" alt="cute"/>
                    </div>
                    <div class="font-bold text-4xl py-1">LEITHAL</div>
                </div>
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="h-[30px] me-3 aspect-square">
                        <img src="/Captain_Icon.png" class="h-full w-full" alt="cute"/>
                    </div>
                    <div class="font-bold text-4xl py-1">Plasim</div>
                </div>
        
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">MgkNominator</div>
                </div>
        
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">RoadmanReginald</div>
                </div>

                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">Phy</div>
                </div>
            </div>
        </div>

        <!--Match Coordinators-->
        <div class="flex flex-col bg-purple rounded-2xl px-12 py-8 bg-opacity-80 w-[460px]">
            <div class="flex flex-row justify-center items-center text-center">

                <div class="font-extrabold text-5xl text-center pb-4">MATCH COORDINATORS</div>
            </div>
        
            <div class="flex flex-col justify-center items-center text-center">
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="h-[30px] me-3 aspect-square">
                        <img src="/Captain_Icon.png" class="h-full w-full" alt="cute"/>
                    </div>
                    <div class="font-bold text-4xl py-1">teknoz</div>
                </div>
        
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">ajmonkey21</div>
                </div>
        
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">Supaconnor</div>
                </div>

                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">ServerBP</div>
                </div>
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">PrPlaya</div>
                </div>
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">flashy</div>
                </div>
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">RZzach</div>
                </div>
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">Rotech</div>
                </div>
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">MrMan</div>
                </div>
            </div>
        </div>
        <!--Stream Casters-->
        <div class="flex flex-col bg-purple rounded-2xl px-12 py-8 bg-opacity-80 w-[425px]">
            <div class="flex flex-row justify-center items-center text-center">

                <div class="font-extrabold text-5xl text-center pb-4">STREAM CASTERS</div>
            </div>
        
            <div class="flex flex-col justify-center items-center text-center">
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="h-[30px] me-3 aspect-square">
                        <img src="/Captain_Icon.png" class="h-full w-full" alt="cute"/>
                    </div>
                    <div class="font-bold text-4xl py-1">adqm</div>
                </div>
        
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">Gio</div>
                </div>
        
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">MgkNominator</div>
                </div>

                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">WDG_Mid</div>
                </div>
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">Supaconnor</div>
                </div>
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">LEITHAL</div>
                </div>
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">RoadmanReginald</div>
                </div>
            </div>
        </div>

        <!--Other Thanks-->
        <div class="flex flex-col bg-purple rounded-2xl px-12 py-8 bg-opacity-80 w-[375px]">
            <div class="flex flex-row justify-center items-center text-center">

                <div class="font-extrabold text-5xl text-center pb-4">OTHER THANKS</div>
            </div>
        
            <div class="flex flex-col justify-center items-center text-center">
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">Challenge Sabers</div>
                </div>
                <div class="flex flex-row justify-center items-center text-center">
                    
                    <div class="font-bold text-4xl py-1">Underscore</div>
                </div>
        
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">Moon (TA)</div>
                </div>
        
                <div class="flex flex-row justify-center items-center text-center">
                    <div class="font-bold text-4xl py-1">WDG_Mid</div>
                </div>
            </div>
        </div>

    </div>

    

    

    <div class="flex flex-grow" />

    <!-- Footer -->
    <div class="flex w-full h-fit">
        <div class="flex flex-col justify-end items-center h-fit w-full">
            <div class="flex flex-row items-center justify-center bg-red bg-opacity-50 rounded-t-2xl">
                <!-- <img src="https://reactive.fugi.tech/group?layer-name=Discord+Reactive+-+Group&layer-width=1920&layer-height=300" class="h-full w-fuull aspect-square rounded-lg" alt="cute"/> -->
                 <iframe src="https://reactive.fugi.tech/group?layer-name=Discord+Reactive+-+Group&layer-width=1920&layer-height=300" title="discord"></iframe>
            </div>
        </div>
    </div>
</div>