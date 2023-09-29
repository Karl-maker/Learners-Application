"use client"

import { useScreenSize } from "@/context/screen/provider";

export default function Home() {

    const size = useScreenSize();

    return (
        <h1>{size.screenSize}</h1>
    );
}
