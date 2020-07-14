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

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  activeState: INITIAL_UI_STATE,
  storeData: INITIAL_DATA_STATE,
};
export interface ApplicationState {
  activeState: UiState,
  storeData: DataState
}

export const UserData = (state = INITIAL_APPLICATION_STATE, action) => {
  switch (action.type) {
    /*************************USER***********************/
    case 'SET_USER':
      return {
        activeState: {...state.activeState, user: action.payload},
        storeData: {...state.storeData}
      }
    /*************************ALL PROJECTS***********************/    
    case 'SET_ALL_PROJECTS':
      return {
        activeState: {...state.activeState, user: action.payload.user},
        storeData: {...state.storeData, allProjects: action.payload.projects}
      }
    case 'ADD_PROJECT':
      return {
        activeState: {...state.activeState, activeProjectId: action.payload.id},
        storeData: {...state.storeData, allProjects: [state.storeData.allProjects, {
          name: action.payload.name,
          closed: {
            admin: {value: false, by: null},
            client: {value: false, by: null},
          },
          _id: action.payload.id
        }]}
      }
    case 'DELETE_PROJECT':
      return {
        activeState: {...state.activeState, activeProjectId: null},
        storeData: {...state.storeData,
          allProjects: state.storeData.allProjects.filter(project => project._id != state.activeState.activeProjectId)
        }
      }
    case 'SET_ACTIVE_PROJECT':
      return {
        activeState: {
          ...state.activeState, activeProjectId: action.payload
        },
        storeData: {...state.storeData }
      }
    /*************************PROJECTS OVERVIEW***********************/    
    case 'SET_PROJECT_OVERVIEW':
      return {
        activeState: {
          ...state.activeState,
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
        },
        storeData: {...state.storeData,
          issues: action.payload.issues,
          features: action.payload.features,
          links: action.payload.links,          
          users: action.payload.users,
        }
      }
    case 'CLOSE_PROJECT_ADMIN':
      return {
        activeState: {
          ...state.activeState,
          activeProjectState: {
            closed: {
              ... state.activeState.activeProjectState.closed,
              admin: {
                value: true,
                by: state.activeState.user
              },
            }        
          }
        },
        storeData: {...state.storeData,}
      }
    case 'CLOSE_PROJECT_CLIENT':
      return {
        activeState: {
          ...state.activeState, activeProjectId: action.payload._id,
          activeProjectState: {
            closed: {
              ... state.activeState.activeProjectState.closed,
              client: {
                value: true,
                by: state.activeState.user
              },
            }        
          }
        },
        storeData: {...state.storeData}
      }
    /*************************COMMENTS***********************/
    case 'GET_COMMENT':
      return {
        activeState: { ...state.activeState },
        storeData: {...state.storeData,                    
          comments: action.payload.comments,
        }
      }
    case 'SET_COMMENT':
      return {
        activeState: { ...state.activeState, activeComponentId: action.payload.componentId,
          activeComponentType: action.payload.type,
        },
        storeData: {...state.storeData }
      }    

    case 'ADD_COMMENT':
      return {
        activeState: { ...state.activeState},
        storeData: {...state.storeData,                    
          comments: [...state.storeData.comments, {
            by: {
              name: state.activeState.user.name,
              email: state.activeState.user.email,
            },
            createdAt: new Date(),
            description: action.payload.comment,
            _id: action.payload.id
          }],
        }
      }
    case 'DELETE_COMMENT':
      return {
        activeState: { ...state.activeState},
        storeData: {
          ...state.storeData,                    
          comments: state.storeData.comments.filter(comment => comment._id != action.payload)
        }
      }
    /**************************LINKS *******************/
    case 'ADD_LINK':
      return {
        activeState: { ...state.activeState},
        storeData: {...state.storeData,                    
          links: [...state.storeData.links, 
            {for: action.payload.for,
            link: action.payload.link,
          }]
        }
      }
    case 'REMOVE LINK':
      return {
        activeState: { ...state.activeState},
        storeData: {...state.storeData,   
          links: state.storeData.links.filter(link => link.for != action.payload)
        }
      }
    /*************************ISSUES***********************/
    case 'ADD_ISSUE':
      return {
        activeState: { ...state.activeState},
        storeData: {...state.storeData,                    
          issues: [...state.storeData.issues, 
            {
              _id: action.payload.id,
              accepted: {value: false, by: null},
              closed: {value: false, by: null},
              description: action.payload.description, 
            }
          ]
        }
      }
    case 'REMOVE_ISSUE':
      return {
        activeState: { ...state.activeState},
        storeData: {...state.storeData,                    
          issues:  state.storeData.issues.filter(issue => issue._id !== action.payload)
        }
      };
    case 'CHANGE_ACCEPTANCE_ISSUE':
      if (action.payload.status == true)
        return { activeState: { ...state.activeState},
          storeData: {...state.storeData,                    
            issues: state.storeData.issues.map((issue => {
              if (issue._id === action.payload.id) {
                return Object.assign({}, issue, {
                  accepted: {value: true, by: action.payload.user}
                });
              }
              return issue;
            }))
          }
        }
      return { activeState: { ...state.activeState},
        storeData: {...state.storeData,                    
          issues: state.storeData.issues.map((issue => {
            if (issue._id === action.payload.id) {
              return Object.assign({}, issue, {
                accepted: {value: false, by: null}
              });
            }
            return issue;
          }))
        }
      }
    case 'CHANGE_COMPLETE_ISSUE':
      if (action.payload.status == true)
        return { activeState: { ...state.activeState},
          storeData: {...state.storeData,                    
            issues: state.storeData.issues.map((issue => {
              if (issue._id === action.payload.id) {
                return Object.assign({}, issue, {
                  closed: {value: true, by: action.payload.user}
                });
              }
              return issue;
            }))
          }
        }
      return { activeState: { ...state.activeState},
        storeData: {...state.storeData,                    
          issues: state.storeData.issues.map((issue => {
            if (issue._id === action.payload.id) {
              return Object.assign({}, issue, {
                closed: {value: false, by: null}
              });
            }
            return issue;
          }))
        }
      }
    /**************************FEATURES *******************/
    case 'ADD_FEATURE':
      return {
        activeState: { ...state.activeState},
        storeData: {...state.storeData,                    
          features: [...state.storeData.features, 
            {
              _id: action.payload.id,
              accepted: {value: false, by: null},
              completed: {value: false, by: null},
              deadline: new Date(action.payload.dueDate),
              description: action.payload.description, 
            }
          ]
        }
      }
    case 'REMOVE_FEATURE':
      return {
        activeState: { ...state.activeState},
        storeData: {...state.storeData,                    
          features:  state.storeData.features.filter(feature => feature._id !== action.payload)
        }
      };
    case 'CHANGE_ACCEPTANCE_FEATURE':
      if (action.payload.status == true)
        return { activeState: { ...state.activeState},
          storeData: {...state.storeData,                    
            features: state.storeData.features.map((feature => {
              if (feature._id === action.payload.id) {
                return Object.assign({}, feature, {
                  accepted: {value: true, by: action.payload.user}
                });
              }
              return feature;
            }))
          }
        }
      return { activeState: { ...state.activeState},
        storeData: {...state.storeData,                    
          features: state.storeData.features.map((feature => {
            if (feature._id === action.payload.id) {
              return Object.assign({}, feature, {
                accepted: {value: false, by: null}
              });
            }
            return feature;
          }))
        }
      }
    case 'CHANGE_COMPLETE_FEATURE':
      if (action.payload.status == true)
        return { activeState: { ...state.activeState},
          storeData: {...state.storeData,                    
            features: state.storeData.features.map((feature => {
              if (feature._id === action.payload.id) {
                return Object.assign({}, feature, {
                  completed: {value: true, by: state.activeState.user}
                });
              }
              return feature;
            }))
          }
        }
      return { activeState: { ...state.activeState},
        storeData: {...state.storeData,                    
          features: state.storeData.features.map((feature => {
            if (feature._id === action.payload.id) {
              return Object.assign({}, feature, {
                completed: {value: false, by: null}
              });
            }
            return feature;
          }))
        }
      }
    /**************************USERS *******************/
    case 'ADD_USER':
      return {
        activeState: { ...state.activeState},
        storeData: {...state.storeData,                    
          users: [...state.storeData.users, 
            { access: action.payload.role, 
              user: {
                name: action.payload.name, 
                email: action.payload.email,
                _id: action.payload.id
              }
            }
          ],
        }
      }
    case 'REMOVE_USER':
      return {
        activeState: { ...state.activeState},
        storeData: {...state.storeData,                    
          users:  state.storeData.users.filter(user => user.user.email !== action.payload)
        }
      };
    /** Reset all data */
    case 'RESET_DATA':
      return INITIAL_APPLICATION_STATE;
    default:
      return state;
  }
};




