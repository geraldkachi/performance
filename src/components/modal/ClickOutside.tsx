import {
	useRef,
	useEffect,
	RefObject,
	HTMLAttributes,
	DetailedHTMLProps
} from 'react';

export default function useClickOutside<T extends HTMLElement>(
	handler: () => void,
	ref: RefObject<T>
) {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);
}

export function ClickOutside(
	props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
		onclickoutside: () => void;
	}
) {
	const { children, onclickoutside, ...rest } = props;
	const ref = useRef<HTMLDivElement>(null);
	useClickOutside(onclickoutside, ref);
	return (
		<div {...rest} ref={ref}>
			{children}
		</div>
	);
}
