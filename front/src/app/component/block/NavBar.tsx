"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { BsChat, BsChatDots, BsPerson, BsStar } from "react-icons/bs";

interface IconProps {
    icon: IconType,
    link: string,
    className: Array<string>
}

const NavBar = ():JSX.Element => {
    const [menuIcons, setMenuIcons] = useState<Array<IconProps>>([]);
    useEffect(()=>{
        setMenuIcons([
            {icon: BsChat, link: "/chat", className: ["navMenuIcon","on"]},
            {icon: BsPerson, link: "/friend", className: ["navMenuIcon"]},
            {icon: BsStar, link: "/favorite", className: ["navMenuIcon"]},
        ]);
    },[])

    const clickMenuIcon = (idx:number) => {
        const menu = menuIcons.map(e=>{return {...e, className: ["navMenuIcon"]}});
        menu[idx].className.push("on");
        setMenuIcons(menu);
    }

    return (
        <div id="navBarWrap">
            <div className="navLogo"><BsChatDots /></div>
            <div className="navContent">
                <ul>
                    {menuIcons.map((e:IconProps, i:number)=>(
                        <li key={i} onClick={()=>{clickMenuIcon(i)}} className={e.className.reduce((e,i)=>e+" "+i)}>
                            <Link href={e.link}>{<e.icon />}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navBottom"></div>
        </div>
    );
}

export default NavBar;