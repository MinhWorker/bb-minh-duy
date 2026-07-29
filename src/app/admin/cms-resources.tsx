import {
  BooleanField, BooleanInput, Create, Datagrid, DateField, DateInput, Edit, List, NumberInput,
  SelectInput, SimpleForm, TextField, TextInput, required,
} from "react-admin";
import { formatJsonField } from "./json-field";

const publishChoices = [{ id: "draft", name: "Bản nháp" }, { id: "published", name: "Đã xuất bản" }];
const verificationChoices = [
  { id: "pending", name: "Chờ kiểm chứng" }, { id: "verified", name: "Đã kiểm chứng" },
  { id: "internal-only", name: "Chỉ dùng nội bộ" }, { id: "rejected", name: "Loại bỏ" },
];

const SiteSettingsForm = () => <>
  <TextInput source="cooperativeName" label="Tên hợp tác xã" validate={required()} fullWidth />
  <TextInput source="logo" label="Logo" fullWidth /><TextInput source="phone" label="Điện thoại" />
  <TextInput source="zalo" label="Zalo" fullWidth /><TextInput source="email" label="Email" fullWidth />
  <TextInput source="address" label="Địa chỉ" multiline fullWidth /><TextInput source="mapUrl" label="URL bản đồ" fullWidth />
  <TextInput source="marketplaceUrl" label="URL gian hàng" fullWidth />
  <TextInput source="socialLinks" label="Mạng xã hội (JSON)" multiline fullWidth format={formatJsonField} />
  <TextInput source="defaultSeoTitle" label="SEO title mặc định" fullWidth />
  <TextInput source="defaultSeoDescription" label="SEO description mặc định" multiline fullWidth />
</>;
export const SiteSettingsList = () => <List><Datagrid rowClick="edit"><TextField source="cooperativeName" label="Tên HTX" /><TextField source="phone" /><TextField source="email" /><DateField source="updatedAt" /></Datagrid></List>;
export const SiteSettingsCreate = () => <Create><SimpleForm><SiteSettingsForm /></SimpleForm></Create>;
export const SiteSettingsEdit = () => <Edit><SimpleForm><SiteSettingsForm /></SimpleForm></Edit>;

const SitePageForm = () => <>
  <SelectInput source="pageKey" label="Trang" choices={[{ id: "home", name: "Trang chủ" }, { id: "about", name: "Giới thiệu" }, { id: "contact", name: "Liên hệ" }]} validate={required()} />
  <TextInput source="title" label="Tiêu đề" validate={required()} fullWidth />
  <TextInput source="hero" label="Hero (JSON)" multiline fullWidth format={formatJsonField} />
  <TextInput source="sections" label="Các section (JSON array)" multiline fullWidth format={formatJsonField} />
  <SelectInput source="status" label="Trạng thái" choices={publishChoices} defaultValue="draft" />
  <DateInput source="publishedAt" label="Ngày xuất bản" /><TextInput source="seoTitle" label="SEO title" fullWidth />
  <TextInput source="seoDescription" label="SEO description" multiline fullWidth />
</>;
export const SitePagesList = () => <List><Datagrid rowClick="edit"><TextField source="pageKey" label="Trang" /><TextField source="title" /><TextField source="status" /><DateField source="updatedAt" /></Datagrid></List>;
export const SitePagesCreate = () => <Create><SimpleForm><SitePageForm /></SimpleForm></Create>;
export const SitePagesEdit = () => <Edit><SimpleForm><SitePageForm /></SimpleForm></Edit>;

const NewsForm = () => <>
  <TextInput source="title" label="Tiêu đề" validate={required()} fullWidth /><TextInput source="slug" label="Slug" fullWidth />
  <TextInput source="summary" label="Tóm tắt" multiline fullWidth /><TextInput source="content" label="Nội dung" multiline validate={required()} fullWidth />
  <TextInput source="image" label="Ảnh" fullWidth /><TextInput source="imageAlt" label="Alt text" fullWidth />
  <SelectInput source="status" label="Trạng thái" choices={publishChoices} defaultValue="draft" /><NumberInput source="sortOrder" label="Thứ tự" defaultValue={0} />
  <DateInput source="publishedAt" label="Ngày xuất bản" /><TextInput source="seoTitle" label="SEO title" fullWidth />
  <TextInput source="seoDescription" label="SEO description" multiline fullWidth />
</>;
export const NewsList = () => <List><Datagrid rowClick="edit"><TextField source="title" /><TextField source="slug" /><TextField source="status" /><DateField source="publishedAt" /></Datagrid></List>;
export const NewsCreate = () => <Create><SimpleForm><NewsForm /></SimpleForm></Create>;
export const NewsEdit = () => <Edit><SimpleForm><NewsForm /></SimpleForm></Edit>;

const ClaimForm = () => <>
  <TextInput source="claim" label="Nội dung claim" multiline validate={required()} fullWidth />
  <TextInput source="subjectType" label="Loại đối tượng" /><NumberInput source="subjectId" label="ID đối tượng" />
  <SelectInput source="evidenceKind" label="Loại bằng chứng" choices={[{ id: "official-document", name: "Tài liệu chính thức" }, { id: "internal-report", name: "Báo cáo nội bộ" }, { id: "owner-confirmation", name: "Chủ HTX xác nhận" }]} validate={required()} />
  <TextInput source="sourceReference" label="Nguồn" validate={required()} fullWidth /><DateInput source="sourceDate" label="Ngày nguồn" />
  <TextInput source="sourceLocation" label="Trang/đoạn/ô" fullWidth /><SelectInput source="verificationStatus" label="Kiểm chứng" choices={verificationChoices} defaultValue="pending" />
  <TextInput source="reviewedBy" label="Người duyệt" /><DateInput source="reviewedAt" label="Ngày duyệt" />
  <TextInput source="conflictNotes" label="Mâu thuẫn/ghi chú" multiline fullWidth />
</>;
export const ClaimRegistryList = () => <List><Datagrid rowClick="edit"><TextField source="claim" /><TextField source="evidenceKind" /><TextField source="verificationStatus" /><DateField source="reviewedAt" /></Datagrid></List>;
export const ClaimRegistryCreate = () => <Create><SimpleForm><ClaimForm /></SimpleForm></Create>;
export const ClaimRegistryEdit = () => <Edit><SimpleForm><ClaimForm /></SimpleForm></Edit>;

const MediaForm = () => <>
  <TextInput source="sourcePath" label="Đường dẫn nguồn (chỉ nội bộ)" validate={required()} fullWidth />
  <TextInput source="assetUrl" label="URL asset đã sao chép" fullWidth /><SelectInput source="mediaKind" label="Loại" choices={[{ id: "photo", name: "Ảnh" }]} defaultValue="photo" />
  <SelectInput source="provenance" label="Nguồn gốc" choices={[{ id: "real", name: "Ảnh thật" }, { id: "approved-ai", name: "AI đã duyệt" }, { id: "generated-texture", name: "Texture mới đã duyệt" }]} validate={required()} />
  <TextInput source="usageRights" label="Quyền sử dụng" multiline fullWidth /><TextInput source="altText" label="Alt text" validate={required()} fullWidth />
  <TextInput source="displayRole" label="Vai trò hiển thị" /><BooleanInput source="isApproved" label="Đã duyệt" defaultValue={false} />
</>;
export const MediaManifestList = () => <List><Datagrid rowClick="edit"><TextField source="displayRole" /><TextField source="provenance" /><TextField source="altText" /><BooleanField source="isApproved" /></Datagrid></List>;
export const MediaManifestCreate = () => <Create><SimpleForm><MediaForm /></SimpleForm></Create>;
export const MediaManifestEdit = () => <Edit><SimpleForm><MediaForm /></SimpleForm></Edit>;
