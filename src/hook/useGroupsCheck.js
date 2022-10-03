 export default function useGroupsCheck(setSelects,selects, typeGroups){
    const onChange = (e) => {
        e.target.checked
            ? setSelects({
                  ...selects,
                  [typeGroups]: [...selects[typeGroups], e.target.value],
              })
            : setSelects({
                  ...selects,
                  [typeGroups]: selects[typeGroups].filter(
                      (item) => item.id !== e.target.value.id
                  ),
              });
    };
     return {onChange}
 }