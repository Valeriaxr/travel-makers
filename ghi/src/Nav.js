import { NavLink } from "react-router-dom";
import { useGetHotelsQuery } from "./store/hotelsApi";

function Nav() {
    const { data } = useGetHotelsQuery();

}
