import { UserRole } from '../interfaces/User';

class PermissionService {
    private user: UserRole = undefined;
    private isSuperAdmin: boolean = false;
    private isAdmin: boolean = false;
    private isUser: boolean = false;

    constructor(user?: UserRole) {
        this.user = user ? user : this.user;

        this.isUser = user === 'user';
        this.isAdmin = user === 'admin';
        this.isSuperAdmin = user === 'superadmin';
    }

    canByPassLogin(): boolean {
        if (this.user) {
            return this.isSuperAdmin;
        }
        return false;
    }

    canCreateExercise(): boolean {
        if (this.user) {
            return this.isSuperAdmin || this.isAdmin;
        }
        return false;
    }

    canCreatePlaylist(): boolean {
        if (this.user) {
            return this.isSuperAdmin || this.isAdmin || this.isUser;
        }
        return false;
    }

    canUpdatePlaylist(): boolean {
        if (this.user) {
            return this.isSuperAdmin || this.isAdmin || this.isUser;
        }
        return false;
    }

    canUpdateExercise(): boolean {
        if (this.user) {
            return this.isSuperAdmin || this.isAdmin;
        }
        return false;
    }

    canDeletePlaylist(): boolean {
        if (this.user) {
            return this.isSuperAdmin || this.isAdmin || this.isUser;
        }
        return false;
    }

    canDeleteExercise(): boolean {
        if (this.user) {
            return this.isSuperAdmin || this.isAdmin;
        }
        return false;
    }
}

export default PermissionService;
