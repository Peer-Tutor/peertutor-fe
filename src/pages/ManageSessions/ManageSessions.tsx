import React, { useEffect, useState } from "react";
import { UpcomingActivities } from './UpcomingActivities';
import { IncomingRequest } from './IncomingRequest';
import { SessionStats } from './SessionStats';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const ManageSessions = ({refresh}: {refresh: number}) => {
    return (
        <div className="grid col-12">
            <div className="field col-7">
               <SessionStats />
               <UpcomingActivities refresh={refresh}/>
            </div>
            <div className="field col-5">
                <IncomingRequest refresh={refresh}/>
            </div>
        </div>
    );
};
export { ManageSessions };