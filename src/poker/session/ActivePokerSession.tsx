import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { PokerSession, PokerItem } from "../../types";
import useApi from "../../context/api/useApi";

import styles from "./ActivePokerSession.module.scss";
import useMessaging from "../../context/messaging/useMessaging";

const EditPokerSession:React.FC = () => {
    const { sessionId } = useParams<{sessionId:string}>();
    const { joinPokerSession, leavePokerSession } = useMessaging();
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
        joinPokerSession(session!.id,()=>{});
        setCurrentItem(session!.items[0]);
        return(()=>{
            leavePokerSession(session!.id);
        });
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