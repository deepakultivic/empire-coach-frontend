import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import JobsData from './JobsData';

const JobTabs = () => {
  const [activeTab, setActiveTab] = useState("activeJobs");

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  // map keys to user-friendly names
  const tabesName = {
    activeJobs: "activeJobs",
    awaitingRescheduled: "awaitingRescheduled",
    awaitingCancellation: "awaitingCancellation",
    cancelled: "cancelled"
  };

  return (
    <div className="tabs_wrapper position-relative">
      <Tabs
        activeKey={activeTab}
        onSelect={handleTabChange}
        id="justify-tab-example"
        justify
        className="jobs_tabs"
      >
        <Tab eventKey="activeJobs" title="Active jobs">
          <JobsData tabName={tabesName[activeTab]} />
        </Tab>
        <Tab eventKey="awaitingRescheduled" title="Awaiting Reschedule Date">
          <JobsData tabName={tabesName[activeTab]} />
        </Tab>
        <Tab eventKey="awaitingCancellation" title="Awaiting Cancellation">
          <JobsData tabName={tabesName[activeTab]} />
        </Tab>
        <Tab eventKey="cancelled" title="Cancelled">
          <JobsData tabName={tabesName[activeTab]} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default JobTabs;
