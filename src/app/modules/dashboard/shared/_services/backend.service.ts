import { Injectable } from '@angular/core';
import { UrlService } from '../../../../shared/_services/url.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardBackendService {
    activeProjectID: any;
    activeType: any;
    activeComponentID: any;
    activeCommentID: any;

    constructor(private url: UrlService, private http: HttpClient, private _store: Store<any>, private route: ActivatedRoute) {
        this._store.select('UserData').subscribe(data => {
            if (data.activeState.activeProjectId != undefined) {
                this.activeProjectID = data.activeState.activeProjectId;
            }
            if (data.activeState.activeComponentType != undefined) {
                this.activeType = data.activeState.activeComponentType;
                this.activeComponentID = data.activeState.activeComponentId;
                this.activeCommentID = data.activeState.activeCommentID;
            }
        });
        if (this.activeProjectID == undefined) {
            const projectId = this.route.snapshot.queryParamMap.get('projectId');
            if (projectId != undefined) this.activeProjectID = projectId;
        }
        if (this.activeComponentID == null) {            
            const issueId: string = this.route.snapshot.queryParamMap.get('issueId');
            const featureId: string = this.route.snapshot.queryParamMap.get('featureId');
            if (issueId != null) {
                this.activeType = 'issue';
                this.activeComponentID = issueId;
            } else if (featureId != null) {
                this.activeType = 'feature';
                this.activeComponentID = featureId;
            }
        }
    }

    getAllProjects() {
        return this.http.get(this.url.allProjectsUrl);
    }
    addProject(name) {
        return this.http.post(this.url.addProjectUrl, {'name': name});
    }
    fetchProjectDashboard(activeComponentId) {
        return this.http.post(this.url.allProjectsUrl, {'projectId': this.activeProjectID})
    }
    closeProject(activeComponentId, access) {
        return this.http.post(this.url.closeProjectUrl, {'projectId': this.activeProjectID, 'projectAccess': access})
    }
    deleteProject(activeComponentId) {
        return this.http.post(this.url.deleteProjectUrl, {'projectId': this.activeProjectID});
    }

    addFeature(description, dueDate, activeComponentId) {
        return this.http.post(this.url.addFeatureToProjectUrl, {'description': description, 'deadline': new Date(dueDate), 'projectId': this.activeProjectID})
    }
    deleteFeature(id, activeProjectID) {
        return this.http.post(this.url.removeFeatureToProjectUrl, {'featureId': id, 'projectId': this.activeProjectID});
    }
    acceptFeature(id, status, activeComponentId) {
        return this.http.post(this.url.acceptFeatureUrl, {'status': status, 'projectId': this.activeProjectID, 'featureId': id})
    }
    markFeature(id, status, activeComponentId) {
        return this.http.post(this.url.markFeatureCompleteUrl, {'status': status, 'projectId': this.activeProjectID, 'featureId': id});
    }

    addLink(description, link, activeComponentId) {
        return this.http.post(this.url.addLinkUrl, {'linkFor': description, 'link': link, 'projectId': this.activeProjectID});
    }
    deleteLink(link_id, activeComponentId) {
        return this.http.post(this.url.removeUrl, {'linkFor': link_id, 'projectId': this.activeProjectID})
    }

    addIssue(description, activeComponentId) {
        return this.http.post(this.url.addIssueToProjectUrl, {'description': description, 'projectId': this.activeProjectID});
    }
    deleteIssue(id, activeComponentId) {
        return this.http.post(this.url.removeIssueToProjectUrl, {'issueId': id, 'projectId': this.activeProjectID});
    }
    changeStatusIssue(status, id, activeComponentId) {
        if (status == 'accept')
            return this.http.post(this.url.acceptIssueUrl, {'issueId': id, 'projectId': this.activeProjectID})
        return this.http.post(this.url.rejectIssueUrl, {'issueId': id, 'projectId': this.activeProjectID});
    }
    closeIssue(id, status, activeComponentId) {
        if (status == true) return this.http.post(this.url.completeIssueUrl, {'projectId': this.activeProjectID, 'issueId': id});
        return this.http.post(this.url.incompleteIssueUrl, {'projectId': this.activeProjectID, 'issueId': id})
    }


    deleteComment(id, activeType, activeComponentId, activeID) {
        return this.http.post(this.url.deleteCommentsUrl, { 'commentId': id, 'type': this.activeType, 'projectId': this.activeProjectID, 'componentId': this.activeComponentID })
    }
    addComment(comment, activeType, activeComponentId, activeID) {
        return this.http.post(this.url.addCommentsUrl, { 'description': comment, 'type': this.activeType, 'projectId': this.activeProjectID, 'componentId': this.activeComponentID })
    }
    getAllComments(activeType, activeComponentId, activeID) {
        return this.http.post(this.url.getCommentsUrl, { 'projectId': this.activeProjectID, 'componentId': this.activeComponentID, 'type': this.activeType });
    }
    
    searchUser(query) {
        return this.http.post(this.url.userSearchUrl, {'query': query});
    }

    addUser(role, email, name, activeProject) {
        return this.http.post(this.url.addUserToProjectUrl, {'projectId': this.activeProjectID, 'emailToAdd': email, mode: role})
    }
    deleteUser(email, activeComponentId) {
        return this.http.post(this.url.removeUserToProjectUrl, {'projectId': this.activeProjectID, 'emailToRemove': email})
    }
}