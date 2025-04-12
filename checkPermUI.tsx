import { useState, useEffect } from "react";

const gitPath = "/Dallefar/checkPerm/refs/heads/main/check.txt"

interface VersionCheckerProps {
    children: React.ReactNode;
}

export default function VersionChecker({ children }: VersionCheckerProps) {
    const [access, setAccess] = useState(false);

    useEffect(() => {
        const checkPerm = async () => {
            try {
                const response = await fetch(`https://raw.githubusercontent.com${gitPath}`);
                if (!response.ok) throw new Error("Can't get perms");

                const gitText = await response.text();

                (String(gitText.trim()) === "true") ? setAccess(true) : setAccess(false);
            } catch (error) {
                console.error(error);
            }
        };

        checkPerm();
    }, []);

    return (
        <>
            {access ? (
                [children]
            ) : (
                <div className="flex flex-col items-center absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  px-6 py-3 rounded-md bg-zinc-950">
                    <h1 className="animate-pulse text-4xl text-red-600">No access</h1>
                    <span className="text-base text-white/75">Contact dallefar on Discord</span>
                </div>
            )}
        </>
    );
};
