import React from 'react';
import '../components/component css/Component.css';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const JobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-5 cursor-pointer card-bg"
      onClick={() => navigate(`/description/${job._id}`)}
    >
      <div>
        <h1 className="card-h1">{job?.company?.name}</h1>
        <p className="card-p">India</p>
      </div>
      <div>
        <h1 className="card-h1">{job?.title}</h1>
        <p className="card-p">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 card-badge">
        <Badge className="text-blue-900 font-bold badge-bg" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-blue-700 font-bold badge-bg" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-blue-400 font-bold badge-bg" variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
