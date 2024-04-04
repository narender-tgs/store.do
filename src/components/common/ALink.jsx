import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function ALink({ children, className, style, href, ...props }) {
    const location = useLocation();

    if (typeof href === 'object') {
        if (!href.pathname) {
            href.pathname = location.pathname;
        }

        if (href.query && href.query.grid) {
            href.pathname.replace('[grid]', href.query.grid);
        }
    }

    return (
        <>
            {href !== '#' ?
                <Link to={href} {...props}>
                    <a className={className} style={style}>
                        {children}
                    </a>
                </Link>
                : <a className={className} href="#" onClick={e => e.preventDefault()}>{children}</a>
            }
        </>
    )
}
