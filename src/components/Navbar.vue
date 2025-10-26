<template>
    <div class="card">
        <Menubar :model="items">
            <template #item="{ item, props, hasSubmenu }">
                <router-link
                    v-if="item.route"
                    v-slot="{ href, navigate }"
                    :to="item.route"
                    custom
                >
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span>{{ item.label }}</span>
                    </a>
                </router-link>

                <a
                    v-else
                    v-ripple
                    :href="item.url"
                    :target="item.target"
                    v-bind="props.action"
                >
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
                </a>
            </template>

            <template #end>
                <div class="flex items-center gap-2 pr-3">
                    <router-link v-slot="{ href, navigate }" to="/account" custom>
                        <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2">
                            <i class="pi pi-user"></i>
                            <span>Account</span>
                        </a>
                    </router-link>
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const items = ref([
    {
        label: "Home",
        icon: "pi pi-home",
        command: () => router.push("/"),
    },
    {
        label: "Contact",
        icon: "pi pi-phone",
        command: () => router.push("/contact"),
    },
    {
        label: "About",
        icon: "pi pi-info-circle",
        command: () => router.push("/about"),
    },
]);
</script>
