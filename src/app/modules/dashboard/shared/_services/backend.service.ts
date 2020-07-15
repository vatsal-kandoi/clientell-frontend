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

    constructor(private url: UrlService, private http: HttpClient, private _store: Store<any>, private route: ActivatedRoute) {
        this._store.select('UserStateData').subscribe(data => {
            console.log(data);
            if (data.activeProjectId != undefined) {
                this.activeProjectID = data.activeProjectId;
            }
            if (data.activeComponentType != undefined) {
                this.activeType = data.activeComponentType;
                this.activeComponentID = data.activeComponentId;
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
    fetchProjectDashboard() {
        return this.http.post(this.url.allProjectsUrl, {'projectId': this.activeProjectID})
    }
    closeProject(access) {
        return this.http.post(this.url.closeProjectUrl, {'projectId': this.activeProjectID, 'projectAccess': access})
    }
    deleteProject() {
        return this.http.post(this.url.deleteProjectUrl, {'projectId': this.activeProjectID});
    }

    addFeature(description, dueDate) {
        return this.http.post(this.url.addFeatureToProjectUrl, {'description': description, 'deadline': new Date(dueDate), 'projectId': this.activeProjectID})
    }
    deleteFeature(id) {
        return this.http.post(this.url.removeFeatureToProjectUrl, {'featureId': id, 'projectId': this.activeProjectID});
    }
    acceptFeature(id, status) {
        return this.http.post(this.url.acceptFeatureUrl, {'status': status, 'projectId': this.activeProjectID, 'featureId': id})
    }
    markFeature(id, status) {
        return this.http.post(this.url.markFeatureCompleteUrl, {'status': status, 'projectId': this.activeProjectID, 'featureId': id});
    }

    addLink(description, link) {
        return this.http.post(this.url.addLinkUrl, {'linkFor': description, 'link': link, 'projectId': this.activeProjectID});
    }
    deleteLink(link_id) {
        return this.http.post(this.url.removeUrl, {'linkFor': link_id, 'projectId': this.activeProjectID})
    }

    addIssue(description) {
        return this.http.post(this.url.addIssueToProjectUrl, {'description': description, 'projectId': this.activeProjectID});
    }
    deleteIssue(id) {
        return this.http.post(this.url.removeIssueToProjectUrl, {'issueId': id, 'projectId': this.activeProjectID});
    }
    changeStatusIssue(status, id) {
        if (status == 'accept')
            return this.http.post(this.url.acceptIssueUrl, {'issueId': id, 'projectId': this.activeProjectID})
        return this.http.post(this.url.rejectIssueUrl, {'issueId': id, 'projectId': this.activeProjectID});
    }
    closeIssue(id, status) {
        if (status == true) return this.http.post(this.url.completeIssueUrl, {'projectId': this.activeProjectID, 'issueId': id});
        return this.http.post(this.url.incompleteIssueUrl, {'projectId': this.activeProjectID, 'issueId': id})
    }


    deleteComment(id) {
        return this.http.post(this.url.deleteCommentsUrl, { 'commentId': id, 'type': this.activeType, 'projectId': this.activeProjectID, 'componentId': this.activeComponentID })
    }
    addComment(comment) {
        return this.http.post(this.url.addCommentsUrl, { 'description': comment, 'type': this.activeType, 'projectId': this.activeProjectID, 'componentId': this.activeComponentID })
    }
    getAllComments() {
        return this.http.post(this.url.getCommentsUrl, { 'projectId': this.activeProjectID, 'componentId': this.activeComponentID, 'type': this.activeType });
    }
    
    searchUser(query) {
        return this.http.post(this.url.userSearchUrl, {'query': query});
    }

    addUser(role, email, name) {
        return this.http.post(this.url.addUserToProjectUrl, {'projectId': this.activeProjectID, 'emailToAdd': email, mode: role})
    }
    deleteUser(email) {
        return this.http.post(this.url.removeUserToProjectUrl, {'projectId': this.activeProjectID, 'emailToRemove': email})
    }
}