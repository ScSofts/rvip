import React from 'react';
import { AppBar, Typography, Toolbar, IconButton, Paper, Select, MenuItem, TextField,Button} from '@material-ui/core'
import { MenuOutlined,PlayArrowRounded } from '@material-ui/icons';
import swal from 'sweetalert';
import style from './index.module.css';

const ShowAbout = () => {
    swal({
        title: "About React VIP Parser",
        icon: "info",
        text: `
        ©CopyRight S·c
        This application is written by S·c.
        There isn't any video stored in this platform,it's just a link to some websites.
        If you feel infringed, please contact the website master to delete it.
        `,
    });
};

const APISet = [
    {
        text: '接口1，稳定',
        api: "https://tool.bitefu.net/video/?type=1&url="
    },
    {
        text: "接口2,快速",
        api: "https://tool.bitefu.net/video/?type=2&url="
    },
    {
        text: "接口3,快速，清晰",
        api: "https://tool.bitefu.net/video/?type=3&url="
    },
    {
        text: "接口4",
        api: "https://tool.bitefu.net/video/?type=4&url="
    },
    {
        text: "接口5",
        api: "https://tool.bitefu.net/video/?type=5&url="
    },
    {
        text: "接口6",
        api: "https://tool.bitefu.net/video/?type=6&url="
    }
];

/**
 * 
 * @param {SetURL} setURL
 * @param {string} apiURL 
 * @param {string} inputURL 
 */
const handleClick=(apiURL,inputURL,setURL)=>{
    if(inputURL.trim() === ""){
        swal({
            title:"Error:",
            icon:"error",
            text:"URL cannot be empty!"
        });
        return undefined;
    }else{
        setURL(apiURL + inputURL)
    }
};

export default () => {
    const [Selected, setSelected] = React.useState(0);
    const [inputURL,setInputURL] = React.useState("");
    const [URL,setURL] = React.useState("");
    const iframeRef = React.useRef();
    return (
        <>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton color={"inherit"} edge={"start"} title={"About"} onClick={ShowAbout}>
                        <MenuOutlined />
                    </IconButton>
                    <Typography variant={"h6"}>
                        <>React VIP Parser By ScSoft.</>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper className={style.paper}>
                <iframe
                    allowFullScreen={true}
                    title={'For Playing'}
                    frameBorder={0}
                    scrolling={"no"}
                    srcDoc={
                        URL===""?(`
                     <style>
                         
                            h1 {
                                color: rgba(200, 255, 2, 1);
                                text-shadow: 2px 5px 12px rgba(255, 255, 0, 0.6);
                            }
                         
                     </style>
                     <h1>
                     Select An API and Paste URL then click the Play Button.
                     </h1>
                     `
                        ):undefined
                    }
                    ref={iframeRef}
                    src={URL === ""?undefined:URL}
                >

                </iframe>
                <br />
                <Select
                    className={style.select}
                    variant={"outlined"}
                    defaultValue={0}
                    onChange={
                        (e) => setSelected(e.target.value)
                    }
                    title={"Select An API"}
                    >

                    {
                        APISet.map(
                            (value, index) => (
                                <MenuItem key={index} value={index}>
                                    {value.text}
                                </MenuItem>
                            )
                        )
                    }
                </Select>
                <br />
                <TextField
                 variant={"outlined"}
                 className={style.input}
                 label={"Input URL"}
                 placeholder={"Paste your URL here"}
                 onChange={
                    (e)=>setInputURL(e.target.value)
                }
                 >

                </TextField>
                <br/>
                <Button 
                variant={"contained"} 
                color={"secondary"} 
                className={style.playButton} 
                size={"large"}
                onClick={
                    ()=>handleClick(APISet[Selected].api,inputURL,setURL)
                }
                >
                    <PlayArrowRounded style={{
                        "fontSize":"2em"
                    }}/>
                    Play
                </Button>
            </Paper>
        </>
    );
};