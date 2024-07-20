'use client';

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
  
    return (
        <div className={cn("fixed top-0 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>
                <Link href={"/"}>
                    <MenuItem setActive={setActive} active={active} item="Home">
                    </MenuItem>
                </Link>
                <MenuItem setActive={setActive} active={active} item="Plan Now">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/form">Plan</HoveredLink>
                        <HoveredLink href="/trippy-bot">Ask Trippy</HoveredLink>
                        <HoveredLink href="/our-suggestions">Our Suggestions</HoveredLink>
                    </div>
                </MenuItem>
                <Link href={"/contact"}>
                    <MenuItem setActive={setActive} active={active} item="Contact Us">
                    </MenuItem>
                </Link>
            </Menu>
        </div>
    );
}

export default Navbar;
