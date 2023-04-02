<script>
    import "$src/app.css";
    import { page } from "$app/stores";
    import { auth_chk } from "$lib/lib";
    
    let onHidden = true;
    let onProfileBool = true;

    const toggleFlex = (ele) => {
        ele.addEventListener('click', (e) => {
            onHidden = !onHidden;
            e.stopPropagation();
        })

        window.addEventListener("click", () => {
            onHidden = true;
        });
        
    };
    const profileToggle = (ele) => {
        ele.addEventListener('click', (e)=>{
            console.log('asldjflasjdf');
            onProfileBool = !onProfileBool;
            e.stopPropagation();
        })
        window.addEventListener("click", () => {
            onProfileBool = true;
        });
    };

    let url = "/admin";
    $: url = $page.url.pathname;

    $: {
        console.log($page.url.pathname);
        auth_chk()
    }


    

</script>

<svelte:head>
    <!-- SUIT 폰트 CSS -->
    <link
        href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
        rel="stylesheet"
    />
    <link
        href="./../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
        rel="stylesheet"
    />
</svelte:head>

<div class="bg-gray-100 font-sans leading-normal tracking-normal suit-font">
    <nav id="header" class="bg-white fixed w-full z-10 top-0 shadow">
        <div
            class="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0"
        >
            <div class="w-1/2 pl-2 md:pl-0">
                <a
                    class="text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold"
                    href="/admin"
                >
                    <i class="fas fa-sun text-pink-600 pr-3" /> 어드민
                </a>
            </div>
            <div class="w-1/2 pr-0">
                <div class="flex relative float-right">
                    <div class="relative text-sm">
                        <button
                            id="userButton"
                            class="flex items-center focus:outline-none mr-3"
                            use:profileToggle
                        >
                            <img
                                class="w-8 h-8 rounded-full mr-4"
                                src="http://i.pravatar.cc/300"
                                alt="Avatar of User"
                            />
                            <span class="hidden md:inline-block"
                                >Hi, User
                            </span>
                            <svg
                                class="pl-2 h-2"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 129 129"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                enable-background="new 0 0 129 129"
                            >
                                <g>
                                    <path
                                        d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"
                                    />
                                </g>
                            </svg>
                        </button>
                        <div
                            id="userMenu"
                            class="bg-white rounded shadow-md  absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30"
                            class:invisible={onProfileBool}
                        >
                            <ul class="list-reset">
                                <li>
                                    <a
                                        href="/test1"
                                        class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                        >My account</a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="/test2"
                                        class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                        >Notifications</a
                                    >
                                </li>
                                <li>
                                    <hr class="border-t mx-2 border-gray-400" />
                                </li>
                                <li>
                                    <a
                                        href="/test4"
                                        class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                        >Logout</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="block lg:hidden pr-4">
                        <button
                            id="nav-toggle"
                            class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none"
                            use:toggleFlex
                        >
                            <svg
                                class="fill-current h-3 w-3"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Menu</title>
                                <path
                                    d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                class="w-full flex-grow lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 bg-white z-20 "
                id="nav-content"
            >
                <!-- hidden -->
                <ul
                    class="list-reset lg:flex flex-1 items-center px-4 md:px-0"
                    class:hidden={onHidden}
                >
                    <li class="mr-6 my-2 md:my-0 text-gray-500" class:text-pink-600={url == '/admin'}>
                        <a
                            href="/admin"
                            class:border-orange-600={url == '/admin'}
                            class="block py-1 md:py-3 pl-1 align-middle no-underline border-b-2  hover:text-gray-900 hover:border-orange-600"
                        >
                            <i
                                class="fas fa-home fa-fw mr-3 "
                            />
                            <span class="pb-1 md:pb-0 text-sm">기본설정</span>
                        </a>
                    </li>
                    <li class="mr-6 my-2 md:my-0  text-gray-500" class:text-violet-600={url == '/admin/user'}>
                        <a
                            href="/admin/user"
                            class:border-pink-500={url == '/admin/user'}
                            class="block py-1 md:py-3 pl-1 align-middle  no-underline hover:text-gray-900 border-b-2 border-white hover:border-pink-500"
                        >
                            <i class="fas fa-tasks fa-fw mr-3" /><span
                                class="pb-1 md:pb-0 text-sm">회원관리</span
                            >
                        </a>
                    </li>
                    <li class="mr-6 my-2 md:my-0 text-gray-500" class:text-orange-600={url == '/admin/db'}>
                        <a
                            href="/admin/db"
                            class:border-purple-500={url == '/admin/db'}
                            class="block py-1 md:py-3 pl-1 align-middle no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500"
                        >
                            <i class="fa fa-envelope fa-fw mr-3" /><span
                                class="pb-1 md:pb-0 text-sm">DB 리스트</span
                            >
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>

<slot />

<style>
    :global(.suit-font) {
        font-family: "SUIT";
    }
</style>
