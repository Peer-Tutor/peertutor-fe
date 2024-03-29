import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';
import { AccountType, PageLink, SessionStorage, AccountTypeList, SubjectList, CertificateList } from "../../constants/Constant";
import { UpcomingActivitiesResponse } from "../../constants/Model";
import { getUrl, authenticatedSession } from '../../utils/apiUtils';
import { UpcomingActivitiesCard } from './UpcomingActivitiesCard';
import { getUpcomingActivities } from './Services';
import { ScrollPanel } from 'primereact/scrollpanel';
import { useNavigate } from "react-router-dom";

type DasboardActionCardInput = { tutorView?: boolean; refresh: number };
const UpcomingActivities = (props: DasboardActionCardInput) => {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [activityList, setActivities] = useState<UpcomingActivitiesResponse[]>();
    const [dateList, setDates] = useState<string[]>();

    const template = (options:any) => {
        const className = `${options.className} justify-content-start`;
        const titleClassName = `Upcoming Activities`;

        return (
            <div className={className}>
                <label className="text-base font-semibold text-dark-blue mr-1">
                    {titleClassName}
                </label>
                <Badge value={value} severity="info"></Badge>
            </div>
        );
    };

    useEffect(() => {
        if(authenticatedSession()){
            getUpcomingActivities(setActivities, setDates, setValue);
        }else{
            navigate(PageLink.UNAUTHORISED);
        }
    } , [props.refresh]);

    return (
        <Panel headerTemplate={template} className="my-3">
            <ScrollPanel style={{ width: '100%', height: '50vh' }}>
            { dateList && activityList && dateList.length > 0 && activityList.length > 0 ? dateList?.map((date)=>{
                return(
                <div className="flex flex-column mb-4">
                    <label className="flex flex-row text-xl text-black font-semibold my-2">{date}</label>
                    <div className="flex flex-row flex-wrap gap-3 ">
                    {activityList?.map((activity, idx)=>{
                        if(activity.selectedDates == date){
                            return(
                            <React.Fragment key={activity.tutorId} >
                                <UpcomingActivitiesCard
                                    studentName={activity.studentName}
                                    tutorName={activity.tutorName}
                                    tutorId={activity.tutorId}
                                    date={activity.selectedDates}/>
                            </React.Fragment>
                            )
                        }
                    })
                    }
                    </div>
                </div>
                );
              }) : <p className="text-sm text-center text-black font-semibold">No upcoming activities scheduled.</p>
            }
            </ScrollPanel>
        </Panel>
    );
};
export { UpcomingActivities };