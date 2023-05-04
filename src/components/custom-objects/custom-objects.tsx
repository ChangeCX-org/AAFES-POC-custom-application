import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { useCreateObjectsFetcher, useCustomObjectsFetcher, useDeleteObjectsFetcher } from '../../hooks/use-custom-object-connector';
import DataTableManager from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';
import Text from '@commercetools-uikit/text';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import { EditIcon,BinLinearIcon,PlusThinIcon } from '@commercetools-uikit/icons';
import { format } from 'date-fns';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import PrimaryButton from '@commercetools-uikit/primary-button';
import DialogTitle from '@mui/material/DialogTitle';
import FlatButton from '@commercetools-uikit/flat-button';
import { useEffect, useState } from 'react';
import { Box, DialogContent } from '@mui/material';
import TextInput from '@commercetools-uikit/text-input';

const initialData = {
    key:"",
    value:""
}

const CustomObjects = () => {
    // const { page, perPage } = usePaginationState();
    // const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
    // const [container, setcontainer] = useState("");
    const {refetch, data ,error,loading}:any = useCustomObjectsFetcher();

    const {onExecute} = useDeleteObjectsFetcher();

    let dataList = data ? data.customObjects?.results :[];


    const [openWarning, setopenWarning] = useState(false);

    const [selectedItem, setselectedItem] = useState<any>(initialData);

    const [isOpen, setisOpen] = useState(false);

    const [isEdit, setisEdit] = useState(false);

    const handleClose =(reload = false )=> {
        if(reload){
            refetch();
        }
        setselectedItem(initialData);
        setopenWarning(false);
    }

    const onCancel =()=> {
        setselectedItem(initialData);
        setisEdit(false);
        setisOpen(false);
    }

    const onConfirm =async()=> {
        await onExecute(selectedItem.id);
        await refetch();
        handleClose();
    }

    const columns = [
        {key: 'edit', label:'',
        headerIcon: ( <div style={{display:'flex',width:50, justifyContent:'center'}}><SecondaryIconButton
        icon={<PlusThinIcon color='surface' />}
        label="Create"
        onClick={() => {
            setselectedItem(initialData);
        setisOpen(true);
        }}
      /></div>),
        renderItem: (row:any) => <div style={{display:'flex', gap:5, justifyContent:'center'}}>
        <SecondaryIconButton
        icon={<EditIcon />}
        label="Edit"
        onClick={() => {
            setselectedItem({
                id:row.id,
                key: row.key,
                value: row.value
            });
            setisEdit(true);
            setisOpen(true);
        }}
      />
      <SecondaryIconButton
        icon={<BinLinearIcon />}
        label="Delete"
        onClick={() => {
            setselectedItem({
                id:row.id
            });
            setopenWarning(true);
        }}
      />
        </div>},
        { key: 'key', label: 'Key'},
        { key: 'value', label: 'Value'},
        { key: 'container', label: 'Container'},
        { key: 'version', label: 'Version'},
        { key: 'createdAt', label: 'Created At',renderItem:(row:any) => format(new Date(row.createdAt), 'MM/dd/yyyy') },
        { key: 'lastModifiedAt', label: 'Modified At',renderItem:(row:any) => format(new Date(row.lastModifiedAt), 'MM/dd/yyyy') },
      ];
    

      
    if(loading || error){
        return <LoadingSpinner >Loading</LoadingSpinner>
    }

  return (
    <div>
        <Text.Headline as="h3">{'Custom Objects'}</Text.Headline>
        <DataTableManager columns={columns}>
          <DataTable
            rows={dataList}
          />
        </DataTableManager>
        <CustomObjectDailog list={dataList} open={isOpen}  isEdit={isEdit} values={selectedItem}  handleClose={onCancel}/>
        <WarningDailog open={openWarning} handleClose={handleClose} onConfirm={onConfirm} />
    </div>
  )
}

export const WarningDailog =({open, handleClose,onConfirm}:any)=> {
    return  <Dialog
    open={open}
    onClose={handleClose}
  >
    <DialogTitle >
      {"Are you sure to Delete the Key?"}
    </DialogTitle>
    <DialogActions>
    <PrimaryButton
    label="Confirm"
    size='small'
    onClick={onConfirm}
    isDisabled={false}
  />
      <FlatButton
    tone="primary"
    label="Cancel"
    onClick={handleClose}
    isDisabled={false}
  />
    </DialogActions>
  </Dialog>
}

export const CustomObjectDailog =({list,open,values,isEdit, handleClose}:any)=> {

    const {onExecute} =  useCreateObjectsFetcher();

    const [key, setkey] = useState("");

    const [value, setvalue] = useState("");
    const [id, setId] = useState("");

    const [hasError, sethasError] = useState(false);

    const onConfirm =async()=>{
        let draft = {
            key,value,container:"message",id
        };
        await onExecute(draft);
        setloading(true);
        handleClose(true);
    }

    const [loading, setloading] = useState(false);

    useEffect(() => {
      setloading(false);
      setkey(values.key);
      setvalue(values.value);
      setId(values.id);
    }, [open])
    

    return  <Dialog
    open={open}
    onClose={handleClose}
  >
    <DialogTitle  >
      {`${isEdit ? "Update":"Create"} Custom Object`}
    </DialogTitle>
    <DialogContent >
    <Text.Body>{'Key'}</Text.Body>
    <TextInput hasError={hasError} value={key} isDisabled={isEdit} onChange={(event) => {setkey(event.target.value);
            let isExist = list.find((x:any)=> x.key === event.target.value && event.target.value !== values.key);
            if(isExist){
                    sethasError(true)
            }else{
                sethasError(false)
            }
    }} />
    {hasError && <Text.Detail  tone="negative">Key Already Exist</Text.Detail>}
    <Box mb={2}></Box>
    <Text.Body>{'Value'}</Text.Body>
    <TextInput value={value}  onChange={(event) => setvalue(event.target.value)} />
    </DialogContent>
    <DialogActions>
    <PrimaryButton
    label={isEdit ? "Update":"Create"}
    size='small'
    onClick={onConfirm}
    isDisabled={loading || hasError}
  />
      <FlatButton
    tone="primary"
    label="Cancel"
    onClick={handleClose}
    isDisabled={loading}
  />
    </DialogActions>
  </Dialog>
}

export default CustomObjects