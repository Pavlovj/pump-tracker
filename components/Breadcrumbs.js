import { Breadcrumbs as BreadCrumbs } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

export default function Breadcrumbs({ props }) {

    const router = useRouter()
    const linkPath = router.asPath.split('/');
    linkPath.shift();
    const pathArray = linkPath.map((path, i) => {
        return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
    });

    return (
        <BreadCrumbs
            aria-label="breadcrumb"
            className='text-slate-400 text-lg'
            separator='>'>
            {
                pathArray.map(({ breadcrumb, href }, idx, { length }) => {
                    return (
                        <Link
                            key={idx}
                            href={href}
                        >

                            <a className={`hover:underline ${(idx + 1 === length ?
                                'text-white'
                                : '')}`
                            }>
                                {/* FIXME redo this */}
                                {idx + 1 === length ? props.name : breadcrumb}
                            </a>

                        </Link>
                    )
                })
            }

        </BreadCrumbs>
    )
}

