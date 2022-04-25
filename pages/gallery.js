import Head from "next/head";
import React, { createRef, useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { NFT } from "../components/rarityFilters/NFT";
import { SideBar } from "../components/rarityFilters/SideBar";
import { PageNumbers } from "../components/rarityFilters/PageNumbers";
import Navbar from "../components/layout/navbar";
import { TraitFilters } from "../components/rarityFilters/TraitFilters";
import Footer from "../components/layout/footer";
import { config } from "../config";
import { getFilters, getNFTs } from "../util/requests";

function Home({ title, img, description, nfts, pages, filters }) {
const router = useRouter();
const ref = createRef(null);
const [showMenu, setShowMenu] = useState(false);
const { all_traits, attr_count } = filters;
const [discordName, setDiscordName] = useState(null);

const data = router.query.name


return (

    <div
    className="flex flex-col items-center justify-center 
    min-h-screen bg-gradient-to-r from-rose-50 to-rose-100 h-full"
    ref={ref}
    >   

     {console.log('router',router.query.name)}
    <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>

    <NextSeo
        title={title}
        openGraph={{
        images: [
            {
            url: img,
            },
        ],
        }}
        twitter={{
        image: img,
        cardType: "summary_large_image",
        }}
        description={description}
    />
    <Navbar/>
    <main className="relative flex justify-center w-full flex-1 h-screen">
        <SideBar
        all_traits={all_traits}
        attr_count={attr_count}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        />
        <div className="flex flex-col w-full w-5xl px-4">
        {showMenu}
        <TraitFilters />
        <div className="flex flex-wrap justify-between sm:justify-start max-w-5xl w-full">
            {nfts.map(
            (nft, idx) => nft && <NFT {...nft} index={idx} key={idx} />
            )}
        </div>
        <PageNumbers pages={pages} />
        </div>
    </main>
    {//<div>{setDiscordName(arrangeDiscordName(window.location.href.toString())) }</div>
}
    <Footer />
    </div>
);
}

Home.getInitialProps = async ({ query }) => {
let { nfts = [], pages } = await getNFTs(query);
let filters = await getFilters(query);
return {
    title: config.COLLECTION_TITLE,
    description: config.COLLECTION_DESCRIPTION,
    img: config.COLLECTION_IMG_LINK,
    discordName: "Matthieu",
    nfts,
    pages,
    filters,
};
};

export default Home;
