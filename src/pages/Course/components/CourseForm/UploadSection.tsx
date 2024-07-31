import BoxUpload from '@/components/BoxUpload';
import { TCreateUpdateUseFormReturn } from '@/types/course';

type UploadSectionProps = {
    form: TCreateUpdateUseFormReturn;
};

const UploadSection: React.FC<UploadSectionProps> = ({ form }) => {
    return (
        <BoxUpload
            width={'100%'}
            height={50}
            initialImage={form.watch('image') as string}
            handleFileChange={(data: File) => form.setValue('image', data)}
            handleDeleteFile={() => form.setValue('image', undefined)}
        />
    );
};

export default UploadSection;
