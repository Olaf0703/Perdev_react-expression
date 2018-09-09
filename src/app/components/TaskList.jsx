import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

export const TaskListItem = ({id,name,commentCount})=>(
    <Link to={`/task/${id}`}>
        <li>
            <span>
                {name} ({commentCount})
            </span>
        </li>
    </Link>
)

export const ConnectedTaskListItem = connect((state, ownProps)=>{
    return {
        ...state.tasks.find(task=>task.id === ownProps.id),
        commentCount:state.comments.filter(comment=>comment.task === ownProps.id).length
    };
})(TaskListItem);

export const GroupContainer = ({tasks,comments,name})=>(
    <div className="group-container">
        <h2>
            {name}
        </h2>
        <ul>
            {tasks.map(task=>(
                <ConnectedTaskListItem {...task} key={task.id}/>
            ))}
        </ul>
    </div>
);


export const ConnectedGroupContainer = connect((state,ownProps)=>{
    console.log("Connected?",ownProps);
    return {
        name:ownProps.name,
        tasks: state.tasks.filter(task=>task.parent === ownProps.id),
    };
})(GroupContainer);