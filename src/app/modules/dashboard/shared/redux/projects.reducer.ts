import * as _ from 'lodash';

export interface UiState {
  user: {name: string, email: string};
  activeProjectId: string;
  activeComponentId: string;
  activeComponentType: string;
  activeCommentId: string;
  activeProjectState: any;
}
export const INITIAL_UI_STATE: UiState = {
  user: {name: null, email: null},
  activeProjectId: null,
  activeComponentId: null,
  activeComponentType: null,
  activeCommentId: null,
  activeProjectState: {
    name: null,
    access: null,
    closed: {
      admin: {
        value: false,
        by: null
      },
      client: {
        value: false,
        by: null
      }
    },
  }
}
export interface DataState {
  issues: any[];
  features: any[];
  allProjects: any[];
  comments: any[];
  links: any[];  
  users: any[];
  commentDescription: any;
}
export const INITIAL_DATA_STATE: DataState = {
  issues: [],
  links: [],
  allProjects: [],
  comments: [],
  features: [],
  users: [],
  commentDescription: {
    description: null,
    addedOn: null,
    closed: null,
    accepted: null,
    completed: null    
  }
};

export const UserStateData = (state = INITIAL_UI_STATE, action) => {
  switch (action.type) {
  /*************************USER***********************/
  case 'SET_USER':
    return {
      ...state, user: action.payload,
    }
  case 'SET_ACTIVE_PROJECT':
    return {
      ...state, activeProjectId: action.payload.id
    }
  /*************************PROJECTS OVERVIEW***********************/
  case 'SET_ACTIVE_PROJECT_DETAILS':
    return {
      ...state,
      activeProjectState: {
        name: action.payload.name,
        access: action.payload.access,
        closed: {
          admin: {
            value: action.payload.closed.admin.value,
            by: action.payload.closed.admin.by
          },
          client: {
            value: action.payload.closed.client.value,
            by: action.payload.closed.client.by
          }
        }        
      }
    }
  case 'CLOSE_PROJECT_ADMIN':
    return { ...state,
      activeProjectState: {
        closed: {
          ... state.activeProjectState.closed,
          admin: {
            value: true,
            by: state.user
          },
        }        
      }
    } 
  case 'CLOSE_PROJECT_CLIENT':
    return { ...state,
      activeProjectState: {
        closed: {
          ... state.activeProjectState.closed,
          client: {
            value: true,
            by: state.user
          },
        }        
      }
    }
  
  /*************************COMMENTS***********************/
  case 'SET_COMMENT':
    return { ...state,
      activeComponentId: action.payload.componentId,
      activeComponentType: action.payload.type,    
    }
  /** Reset all data */
  case 'RESET_USER_DATA':
    return INITIAL_UI_STATE;
  default:
    return state;

  }
}

export const UserDataStore = (state = INITIAL_DATA_STATE, action) => {
  switch (action.type) {
    /*************************ALL PROJECTS***********************/    
    case 'SET_ALL_PROJECTS':
      return {
        ...state, allProjects: action.payload.projects
      };
    case 'ADD_PROJECT':
      return {
          ...state,
          allProjects: [...state.allProjects, {
          name: action.payload.name,
          closed: {
            admin: {value: false, by: null},
            client: {value: false, by: null},
          },
          _id: action.payload.id
        }]
      }
    case 'DELETE_PROJECT':
      return {
        ...state,
        allProjects: state.allProjects.filter(project => project._id != action.payload)
      }
   /*************************PROJECTS OVERVIEW***********************/    
    case 'SET_ACTIVE_PROJECT_OVERVIEW':
      return {...state,
          issues: action.payload.issues,
          features: action.payload.features,
          links: action.payload.links,          
          users: action.payload.users,
      }
    /*************************COMMENTS***********************/
    case 'GET_COMMENT':
      return { ...state,                    
          comments: action.payload,
      }
    case 'ADD_COMMENT':
      return {...state,                    
        comments: [
          ...state.comments, {
          by: {
            name: action.payload.name,
            email: action.payload.email
          },
          createdAt: new Date(),
          description: action.payload.comment,
          _id: action.payload.id
        }],
      }
    case 'DELETE_COMMENT':
      return { ...state,                    
          comments: state.comments.filter(comment => comment._id != action.payload)
      }
    /**************************LINKS *******************/
    case 'ADD_LINK':
      return {...state,                    
        links: [...state.links, 
          {for: action.payload.for,
          link: action.payload.link,
        }]
      }
    case 'REMOVE LINK':
      return {...state,   
        links: state.links.filter(link => link.for != action.payload)
      }
    /*************************ISSUES***********************/
    case 'ADD_ISSUE':
      return {...state,                    
        issues: [...state.issues, 
          {
            _id: action.payload.id,
            accepted: {value: false, by: null},
            closed: {value: false, by: null},
            description: action.payload.description, 
          }
        ]
      }
    case 'REMOVE_ISSUE':
      return {...state,                    
        issues:  state.issues.filter(issue => issue._id !== action.payload)
      };

    case 'CHANGE_ACCEPTANCE_ISSUE':
      if (action.payload.status == true)
        return { ...state,                    
          issues: state.issues.map((issue => {
            if (issue._id === action.payload.id) {
              return Object.assign({}, issue, {
                accepted: {value: true, by: action.payload.user}
              });
            }
            return issue;
          }))
        }
      return { ...state,                    
          issues: state.issues.map((issue => {
            if (issue._id === action.payload.id) {
              return Object.assign({}, issue, {
                accepted: {value: false, by: null}
              });
            }
            return issue;
          }))
        }
    case 'CHANGE_COMPLETE_ISSUE':
      if (action.payload.status == true)
        return { ...state,        
          issues: state.issues.map((issue => {
            if (issue._id === action.payload.id) {
              return Object.assign({}, issue, {
                closed: {value: true, by: action.payload.user}
              });
            }
            return issue;
          }))
        };
      return { ...state,        
        issues: state.issues.map((issue => {
          if (issue._id === action.payload.id) {
            return Object.assign({}, issue, {
              closed: {value: false, by: null}
            });
          }
          return issue;
        }))
      };
    /**************************FEATURES *******************/
    case 'ADD_FEATURE':
      return { ...state,                    
        features: [...state.features, 
          {
            _id: action.payload.id,
            accepted: {value: false, by: null},
            completed: {value: false, by: null},
            deadline: new Date(action.payload.dueDate),
            description: action.payload.description, 
          }
        ]
      }
    case 'REMOVE_FEATURE':
      return {...state,                    
        features:  state.features.filter(feature => feature._id !== action.payload)
      };
    case 'CHANGE_ACCEPTANCE_FEATURE':
      if (action.payload.status == true)
        return { ...state,                    
          features: state.features.map((feature => {
            if (feature._id === action.payload.id) {
              return Object.assign({}, feature, {
                accepted: {value: true, by: action.payload.user}
              });
            }
            return feature;
          }))
        }
      return { ...state,                    
        features: state.features.map((feature => {
          if (feature._id === action.payload.id) {
            return Object.assign({}, feature, {
              accepted: {value: false, by: null}
            });
          }
          return feature;
        }))
      }
    case 'CHANGE_COMPLETE_FEATURE':
      if (action.payload.status == true)
        return { ...state,                    
          features: state.features.map((feature => {
            if (feature._id === action.payload.id) {
              return Object.assign({}, feature, {
                completed: {value: true, by: action.payload.user}
              });
            }
            return feature;
          }))
        }
      return { ...state,                    
        features: state.features.map((feature => {
          if (feature._id === action.payload.id) {
            return Object.assign({}, feature, {
              completed: {value: false, by: null}
            });
          }
          return feature;
        }))
      }

    /**************************USERS *******************/
    case 'ADD_USER':
      return {...state,                    
        users: [...state.users, 
          { access: action.payload.role, 
            user: {
              name: action.payload.name, 
              email: action.payload.email,
              _id: action.payload.id
            }
          }
        ],
      }
    case 'REMOVE_USER':
      return {...state,                    
        users:  state.users.filter(user => user.user.email !== action.payload)
      };
    /** Reset all data */
    case 'RESET_STORE_DATA':
      return INITIAL_DATA_STATE;
    default:
      return state;
  }
};




