 export default function useUsersCheck(setCheckedHandleUsersKeys,setSelects,selects, typeDepartments,typeUsers){
    const onCheck = (checkedKeys, info) => {
        const departments = info.checkedNodes.filter(
            (node) => node.type === "DPT"
        );
        const users = info.checkedNodes.filter(
            (node) =>
                node.type === "USER" &&
                !departments
                    .map((department) => department.value)
                    .includes(node.department)
        );
        setCheckedHandleUsersKeys([
            ...departments.map((department) => department.key),
            ...users.map((user) => user.key),
        ]);
        setSelects({
            ...selects,
            [typeDepartments]: departments,
            [typeUsers]: users,
        });
    };
     return {onCheck}
 }