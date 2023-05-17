import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
export default function useClickOutside(handler, ref) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}
export function ClickOutside(props) {
    const { children, onclickoutside, ...rest } = props;
    const ref = useRef(null);
    useClickOutside(onclickoutside, ref);
    return (_jsx("div", { ...rest, ref: ref, children: children }));
}
