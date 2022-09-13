import React, { createContext } from 'react';
import AuthStore from '../store/AuthStore';
import DepartmentsStore from '../store/DepartmentsStore';
import EventStore from '../store/EventStore';
import FileStore from '../store/FileStore';
import GeneralNotifStore from '../store/GeneralNotifStore';
import PositionsStore from '../store/PositionsStore';
import RolesStore from '../store/RolesStore';
import UsersStore from '../store/UsersStore';
import WorkSchedulesStore from '../store/WorkSchedulesStore';

const AuthContext = createContext();

function AuthProvider(props){
    const authStore = new AuthStore();
    const workSchedulesStore = new WorkSchedulesStore();
    const eventStore = new EventStore()
    const generalNotifStore = new GeneralNotifStore()
    const fileStore= new FileStore();
    const usersStore = new UsersStore();
    const departmentsStore = new DepartmentsStore();
    const positionsStore = new PositionsStore()
    const rolesStore = new RolesStore();
    const value={authStore, workSchedulesStore,eventStore,generalNotifStore,fileStore,usersStore,departmentsStore,positionsStore,rolesStore}
    return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>
}
export {AuthContext,AuthProvider}

