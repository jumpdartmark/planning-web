import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { PokerSession, PokerItem } from "../../types";
import useApi from "../../context/api/useApi";

import styles from "./ActivePokerSession.module.scss";

const EditPokerSession:React.FC = () => {
    const { sessionId } = useParams<{sessionId:string}>();
    const [ session, setSession ] = useState<PokerSession>();
    const [ currentItem, setCurrentItem ] = useState<PokerItem>();
    const { getPokerSessionById } = useApi();

    useEffect(()=>{
        if(!sessionId){
            return;
        }
        getPokerSessionById(sessionId).then(setSession);
    },[sessionId]);

    useEffect(()=>{
        if(!session?.id){
            return;
        }
        setCurrentItem(session!.items[0]);
    },[session?.id]);
    return (
        <div className={styles.session}>
            <div className={styles.header}>
                <h1>{session?.config?.name}</h1>
            </div>
            <div className={styles.body}>
                <div className={styles.playerControls}>
                    player controls
                </div>
                <div className={styles.currentItem}>
                    current item
                    <hr/>
                    {JSON.stringify(currentItem,null,3)}
                </div>
                <div className={styles.itemList}>
                    Item selector
                </div>
            </div>
        </div>
    );
};

export default EditPokerSession;