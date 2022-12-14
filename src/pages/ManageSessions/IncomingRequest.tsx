import axios from "axios"
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage } from "../../constants/Model";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';
import { ScrollPanel } from 'primereact/scrollpanel';
import { IncomingRequestCard } from './IncomingRequestCard';
import { Divider } from "primereact/divider";
import { Paginator } from 'primereact/paginator';
import { PageLink, TUTOR_RESULTS_PAGINATION_PAGE_SIZE, SessionStorage, SubjectList } from "../../constants/Constant";
import { IncomingRequestSearchBar } from './IncomingRequestSearchBar';
import { GetRequestResponse } from './IncomingRequestCard';
import { getTuitionOrderList } from './IncomingRequestService';
import { useForceUpdate } from '../../utils/HookUtils';

const IncomingRequest = ({ refresh }: { refresh: number }) => {
    const [subject, setSubject] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const subjectList = SubjectList;

    const template = (options: any) => {
        const className = `${options.className} justify-content-start`;
        const titleClassName = `Incoming Requests`;

        return (
            <div className={className}>
                <label className="text-base font-semibold text-dark-blue mr-1">
                    {titleClassName}
                </label>
                <Badge value={totalRecords} severity="info"></Badge>
            </div>
        );
    };

    const [tuitionOrderList, setTuitionOrderList] = useState<GetRequestResponse[]>([]) // todo type script
    const { name, sessionToken, profileId } = getSessionTokenValues();
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/detailedTuitionOrders');
    const [onForceUpdate, forceUpdate] = useForceUpdate();
    useEffect(() => {
        getTuitionOrderList(setTotalRecords, setTuitionOrderList)
    }, [refresh])

    useEffect(() => {
        if (onForceUpdate > 0) {
            getTuitionOrderList(setTotalRecords, setTuitionOrderList)
        }
    }, [onForceUpdate])


    const splitString = (dates: string) => {
        dates = dates.replace('[', '');
        dates = dates.replace(']', '');
        var datesSplit = dates.split(', ');
        return datesSplit;
    }

    return (
        <Panel headerTemplate={template} className="singlePanel" >
            <div className="flex flex-row align-items-center gap-2 mb-3">
                <div className="flex-1 flex">
                    <IncomingRequestSearchBar setTotalRecords={setTotalRecords} setTuitionOrderList={setTuitionOrderList} />
                </div>
            </div>
            <div className="grid">
                <div className="col-12 md:col-4">
                    <ScrollPanel style={{ width: '300%', height: '100%' }}>
                        {tuitionOrderList && tuitionOrderList?.length > 0 ? tuitionOrderList?.map((filteredRecord, idx) => {
                            return (
                                <IncomingRequestCard key={idx} ID={filteredRecord.id} StudentID={filteredRecord.studentId} TutorID={String(profileId)} StudentName={filteredRecord.studentName} TutorName={filteredRecord.tutorName} DateTime={splitString(filteredRecord.selectedDates)} Status={filteredRecord.status} OnForceUpdate={forceUpdate} />
                            )
                        }) : <p className="text-center">No students found.</p>}
                    </ScrollPanel>
                </div>
            </div>
        </Panel>
    );
};
export { IncomingRequest };