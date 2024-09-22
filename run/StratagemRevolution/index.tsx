import "react"
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

enum ArrowDirection {
    Up = 1,
    Down,
    Left,
    Right
}

type RawStrategem_t = {
    name: string,
    code: string,
    icon: string
}
type Strategem_t = {
    name: string,
    arrows: ArrowDirection[],
    icon: string
}

var InGameStrategems: Strategem_t[] = null;
const RawInGameStratagems: RawStrategem_t[] = [
    // Mission Stratagems
    { name: "Reinforce",            code: "udrlu",      icon: "Reinforce.svg" },
    { name: "SOS Beacon",           code: "udru",       icon: "SOS Beacon.svg" },
    { name: "Resupply",             code: "ddur",       icon: "Resupply.svg" },
    { name: "NUX-223 Hellbomb",     code: "uduldurdu",  icon: "Hellbomb.svg" },
    { name: "SSD Delivery",         code: "ddduu",      icon: "Upload Data.svg" },
    { name: "Seismic Probe",        code: "uulrdd",     icon: "Seismic Probe.svg" },
    { name: "Upload Data",          code: "lruuu",      icon: "Upload Data.svg" },
    { name: "Eagle Rearm",          code: "uulur",      icon: "Eagle Rearm.svg" },
    { name: "SEAF Artillery",       code: "ruud",       icon: "SEAF Artillery.svg" },
    { name: "Super Earth Flag",     code: "dudu",       icon: "Super Earth Flag.svg" },

    // Supply: Backpacks
    { name: "LIFT-850 Jump Pack",   code: "duudu",      icon: "Jump Pack.svg" },
    { name: "B-1 Supply Pack",      code: "dlduud",     icon: "Supply Pack.svg" },
    { name: "AX/LAS-5 \"Guard Dog\" Rover",     code: "dulurr",     icon: "Guard Dog Rover.svg" },
    { name: "SH-20 Ballistic Shield Backpack",  code: "dlddul",     icon: "Ballistic Shield Backpack.svg" },
    { name: "SH-32 Shield Generator Backpack",  code: "dlddul",     icon: "Shield Generator Pack.svg" },
    { name: "AX/AR-23 \"Guard Dog\"",           code: "dulurd",     icon: "Guard Dog.svg" },

    // Supply: Support Weapons
    { name: "MG-43 Machine Gun",    code: "dldur",      icon: "Machine Gun.svg" },
    { name: "APW-1 Anti-Materiel Rifle",    code: "dlrud",      icon: "Anti-Materiel Rifle.svg" },
    { name: "M-105 Stalwart",       code: "dlduul",     icon: "Stalwart.svg" },
    { name: "EAT-17 Expendable Anti-tank",  code: "ddlur",      icon: "Expendable Anti-Tank.svg" },
    { name: "MLS-4X Commando",      code: "dludr",      icon: "Commando.svg" },
    { name: "GR-8 Recoilless Rifle",        code: "dlrrl",      icon: "Recoilless Rifle.svg" },
    { name: "FLAM-40 Flamethrower",         code: "dludu",      icon: "Flamethrower.svg" },
    { name: "AC-8 Autocannon",      code: "dludu",      icon: "Autocannon.svg" },
    { name: "MG-206 Heavy Machine Gun",     code: "dludd",      icon: "Heavy Machine Gun.svg" },
    { name: "RS-422 Railgun",       code: "drdulr",     icon: "Railgun.svg" },
    { name: "FAF-14 Spear Launcher",        code: "ddudd",      icon: "Spear.svg" },
    { name: "GL-21 Grenade Launcher",       code: "ddudd",      icon: "Grenade Launcher.svg" },
    { name: "LAS-98 Laser Cannon",  code: "dldul",      icon: "Laser Cannon.svg" },
    { name: "ARC-3 Arc Thrower",    code: "drdull",     icon: "Arc Thrower.svg" },
    { name: "LAS-99 Quasar Cannon", code: "ddulr",      icon: "Quasar Cannon.svg" },
    { name: "RL-77 Airburst Rocket Launcher",   code: "duulr",  icon: "Airburst Rocket Launcher.svg" },

    // Supply: Other
    { name: "EXO-45 Patriot Exosuit",       code: "ldruldd",    icon: "Patriot Exosuit.svg" },
    { name: "EXO-49 Emancipator Exosuit",   code: "ldruldu",    icon: "Emancipator Exosuit.svg" },

    // Defensive Stratagems
    { name: "E/MG-101 HMG Emplacement",     code: "dulrrl",     icon: "HMG Emplacement.svg" },
    { name: "FX-12 Shield Generator Relay", code: "ddlrlr",     icon: "Shield Generator Relay.svg" },
    { name: "A/ARC-3 Tesla Tower",          code: "durulr",     icon: "Tesla Tower.svg" },
    { name: "MD-6 Anti-Personnel Minefield",code: "dlur",       icon: "Anti-Personnel Minefield.svg" },
    { name: "MD-14 Incendiary Mines",       code: "dlld",       icon: "Incendiary Mines.svg" },
    { name: "MD-17 Anti-Tank Mines",        code: "dlld",       icon: "Anti-Tank Mines.svg" },
    { name: "A/MG-43 Machine Gun Sentry",   code: "durru",      icon: "Machine Gun Sentry.svg" },
    { name: "A/G-16 Gatling Sentry",        code: "durl",       icon: "Gatling Sentry.svg" },
    { name: "A/M-12 Mortar Sentry",         code: "durrd",      icon: "Mortar Sentry.svg" },
    { name: "A/AC-8 Autocannon Sentry",     code: "durulu",     icon: "Autocannon Sentry.svg" },
    { name: "A/MLS-4X Rocket Sentry",       code: "durrl",      icon: "Rocket Sentry.svg" },
    { name: "A/M-23 EMS Mortar Sentry",     code: "durdr",      icon: "EMS Mortar Sentry.svg" },

    // Offensive: Orbital
    { name: "Orbital Gatling Barrage",      code: "rdluu",      icon: "Orbital Gatling Barrage.svg" },
    { name: "Orbital Airburst Strike",      code: "rrr",        icon: "Orbital Airburst Strike.svg" },
    { name: "Orbital 120MM HE Barrage",     code: "rrdlrd",     icon: "Orbital 120MM HE Barrage.svg" },
    { name: "Orbital 380MM HE Barrage",     code: "rduuldd",    icon: "Orbital 380MM HE Barrage.svg" },
    { name: "Orbital Walking Barrage",      code: "rdrdrd",     icon: "Orbital Walking Barrage.svg" },
    { name: "Orbital Laser",                code: "rdurd",      icon: "Orbital Laser.svg" },
    { name: "Orbital Railcannon Strike",    code: "ruddr",      icon: "Orbital Railcannon Strike.svg" },
    { name: "Orbital Precision Strike",     code: "rru",        icon: "Orbital Precision Strike.svg" },
    { name: "Orbital Gas Strike",           code: "rrdr",       icon: "Orbital Gas Strike.svg" },
    { name: "Orbital EMS Strike",           code: "rrld",       icon: "Orbital EMS Strike.svg" },
    { name: "Orbital Smoke Strike",         code: "rrdu",       icon: "Orbital Smoke Strike.svg" },
    { name: "Orbital Napalm Barrage",       code: "rrdlru",     icon: "Orbital Napalm Barrage.svg" },

    // Offensive: Eagle
    { name: "Eagle Strafing Run",           code: "urr",        icon: "Eagle Strafing Run.svg" },
    { name: "Eagle Airstrike",              code: "urdr",       icon: "Eagle Airstrike.svg" },
    { name: "Eagle Cluster Bomb",           code: "urdr",       icon: "Eagle Cluster Bomb.svg" },
    { name: "Eagle Napalm Airstrike",       code: "urdr",       icon: "Eagle Napalm Airstrike.svg" },
    { name: "Eagle Smoke Strike",           code: "urdr",       icon: "Eagle Smoke Strike.svg" },
    { name: "Eagle 110MM Rocket Pods",      code: "urul",       icon: "Eagle 110MM Rocket Pods.svg" },
    { name: "Eagle 500kg Bomb",             code: "urddd",      icon: "Eagle 500KG Bomb.svg" },
]

async function LoadIcons() {
    await PreloadImage("../icons/redarrow.png")
    await PreloadImage("../icons/arrow.png")

    RawInGameStratagems.forEach(async val => {
        try {
            await PreloadImage(val.icon)
        }
        catch(e) {
            console.log(e)
        }
    })

    InGameStrategems = RawInGameStratagems.map(val => {
        return {
            name: val.name,
            icon: val.icon,
            arrows: [...val.code.toLowerCase()].map(char => {
                switch(char) {
                    case "u":   return ArrowDirection.Up;
                    case "d":   return ArrowDirection.Down;
                    case "l":   return ArrowDirection.Left;
                    case "r":   return ArrowDirection.Right;
                    default:    return ArrowDirection.Up;
                }
            }),
        }
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    await LoadIcons()

    var root = createRoot(document.querySelector("div#game"))
    root.render(<Game />)
})


async function PreloadImage(src: string) {
    return new Promise<void>((resolve, reject) => {
        var img = new Image();
        img.onload = () => {
            //console.log(`Preloaded ${src}`)
            resolve()
        }
        img.onerror = (ev) => {
            console.error(`Failed to load image ${src}`)
            reject(ev)
        }
        img.src = "./svgicons/" + src
    })
}

enum GameState {
    Playing = 1,
    Won,
    Lost
}

type StratagemHistory_t = {
    stratagem: Strategem_t,
    success: boolean
}

function Game(): JSX.Element {
    var [stratagem, setStratagem] = useState<Strategem_t>(null)
    //var [arrows, setArrows] = useState<ArrowDirection[]>([])
    var [entered, setEnteredArrows] = useState<ArrowDirection[]>([])
    var [gameState, setGameState] = useState<GameState>(GameState.Playing)
    var [history, setHistory] = useState<StratagemHistory_t[]>([])
    var baseRef = useRef(null);

    function newStratagem() {
        //var arrowCount = Math.ceil(Math.random() * 3) + 3;
        var stratId = Math.floor(Math.random() * InGameStrategems.length)
        //var newArrows: ArrowDirection[] =  //Array.from({length: arrowCount}, () => Math.floor(Math.random() * 4)+1) 
        setStratagem(InGameStrategems[stratId])

        //setArrows(newArrows)
        setEnteredArrows([]);
        setGameState(GameState.Playing)
    }

    function keyDown(event: React.KeyboardEvent) {
        function appendHistory(stratagem: Strategem_t, success: boolean) {
            var newHistory: StratagemHistory_t = {
                stratagem: stratagem,
                success: success
            }

            if(history.length == 5) {
                history = history.slice(0, -1)
            }
            setHistory([newHistory, ...history])
        }

        //console.log(event.key)
        if(gameState == GameState.Playing) {
            const ArrowMap = {
                arrowup: ArrowDirection.Up,
                arrowdown: ArrowDirection.Down,
                arrowleft: ArrowDirection.Left,
                arrowright: ArrowDirection.Right,
                w: ArrowDirection.Up,
                s: ArrowDirection.Down,
                a: ArrowDirection.Left,
                d: ArrowDirection.Right,
            }
    
            var t = ArrowMap[event.key.toLowerCase()]
            if(t) {
                entered = [...entered, t]
                setEnteredArrows(entered)
    
                if(entered[entered.length-1] != stratagem.arrows[entered.length-1]) {
                    // Fail
                    setGameState(GameState.Lost)
                    appendHistory(stratagem, false)
                }
                else if (entered.length == stratagem.arrows.length) {
                    // Win
                    setGameState(GameState.Won)
                    appendHistory(stratagem, true)
                }
                //console.log(entered)
            }
        }
        else if(event.key == " ") {  // wow really
            //genArrows();
            newStratagem();
        }
    }

    function blurred(event: React.FocusEvent) {
        console.log("blurred");
    }

    useEffect(() => {
        newStratagem()
        
        baseRef.current.focus();
    }, [])

    var playing = (gameState == GameState.Playing ? null : true);
    var won = (gameState == GameState.Won ? true : null);
    var lost = (gameState == GameState.Lost ? true : null);

    return(
        <div className="game-wrapper" ref={baseRef} tabIndex={0} onKeyDown={keyDown} onBlur={blurred}>
            <div className="window">
                <div style={{height: "20rem", width: "50rem"}}>
                    <div>
                        <div className="win-message" data-show={playing}>
                            {gameState == GameState.Won ? "Success!" : gameState == GameState.Lost ? "Failure" : " "}
                        </div>
                        <div className="stratagem-label" data-highlight={won}>
                            {stratagem?.name}
                        </div>
                        <div>
                            <img className="stratagem-icon" src={"./svgicons/" + stratagem?.icon} data-highlight={won}></img>
                        </div>
                    </div>
                </div>
                <div style={{textAlign: "center"}}>
                    <div className="game-box" data-failed={lost}>
                        {stratagem?.arrows.map((val,idx) => {
                            var direction: string = ArrowDirection[val].toLowerCase();
                            var arrowState = idx >= entered.length ? "" : (entered[idx] == val ? "good" : "bad"); 
                            return(
                                <div key={idx} className={"arrow " + direction} data-res={ arrowState }></div> 
                            )
                        })}
                    </div>
                    {/* {(() => { cool that this works
                        return <div></div>
                    })()} */}
                    <div className="control-message" data-flash={playing}>
                        {gameState != GameState.Playing ? "Press space to continue." : " "}
                    </div>
                </div>
            </div>
            <div className="history">
                <div className="history-scroll">
                    {history?.map((histStrat, idx) => {
                        return(
                            <div key={idx} className="history-item">
                                <img className="history" data-failed={histStrat.success ? null : true} src={"./svgicons/" + histStrat.stratagem.icon}></img>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="credits">
                <div>Icons: <a href="https://github.com/nvigneux/Helldivers-2-Stratagems-icons-svg">GitHub</a></div>
                <div>Helldivers 2 copyright Arrowhead Studio and Sony Entertainment</div>
            </div>
        </div>
    )
}