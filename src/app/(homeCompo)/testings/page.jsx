"use client";

import { useStore } from "../../store/user";

const PageCompo = () => {
    const user = useStore(state => state.user);
    const setUser = useStore(state => state.setUser);

    return ( 
        <>
            <h1>Page Component</h1>
            <p>Current User: {user}</p>
            <button onClick={()=>{ setUser("lok") }} >Lol button</button>
        </>
     );
}
 
export default PageCompo;