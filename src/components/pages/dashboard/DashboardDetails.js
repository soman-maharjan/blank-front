import React from 'react'

export default function DashboardDetails() {
    return (
        <div className="mt-10 p-10">
            <div className="w-full shadow stats mb-10">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Likes</div>
                    <div className="stat-value text-primary">25.6K</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div className="stat-title">Page Views</div>
                    <div className="stat-value text-info">2.6M</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-info">
                        <div className="avatar online">
                            <div className="w-16 h-16 p-1 mask mask-squircle bg-base-100">
                                <img src="/tailwind-css-component-profile-5@56w.png" alt="Avatar Tailwind CSS Component" className="mask mask-squircle" />
                            </div>
                        </div>
                    </div>
                    <div className="stat-value">86%</div>
                    <div className="stat-title">Tasks done</div>
                    <div className="stat-desc text-info">31 tasks remaining</div>
                </div>
            </div>

            <div className="border stats border-base-300 mb-5">
                <div className="stat">
                    <div className="stat-title">Account balance</div>
                    <div className="stat-value">$89,400</div>
                    <div className="stat-actions">
                        <button className="btn btn-sm btn-success">Add funds</button>
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-title">Current balance</div>
                    <div className="stat-value">$89,400</div>
                    <div className="stat-actions">
                        <button className="btn btn-sm btn-primary m-2">Withdrawal</button>
                        <button className="btn btn-sm btn-primary">deposit</button>
                    </div>
                </div>
            </div>
            <div className="w-full mt-2 border stats border-base-300">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <button className="btn loading btn-circle btn-lg bg-base-200 btn-ghost" />
                    </div>
                    <div className="stat-value">4,900/7,300</div>
                    <div className="stat-title">Files transfered</div>
                    <div className="stat-desc">
                        <progress value={60} max={100} className="progress progress-secondary" />
                    </div>
                </div>
            </div>
        </div>


    )
}
