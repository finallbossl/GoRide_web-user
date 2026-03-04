import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString, IsUrl, MaxLength, IsEnum, IsNumber, Min } from 'class-validator';
import { DiscountType } from '../types';

export class CreatePromotionDto {
    @IsString({ message: 'Tiêu đề phải là chuỗi ký tự' })
    @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
    @MaxLength(200, { message: 'Tiêu đề không được vượt quá 200 ký tự' })
    title!: string;

    @IsString({ message: 'Mô tả phải là chuỗi ký tự' })
    @IsNotEmpty({ message: 'Mô tả không được để trống' })
    description!: string;

    @IsString({ message: 'Mã ưu đãi phải là chuỗi ký tự' })
    @IsNotEmpty({ message: 'Mã ưu đãi không được để trống' })
    @MaxLength(50, { message: 'Mã ưu đãi không được vượt quá 50 ký tự' })
    code!: string;

    @IsEnum(DiscountType, { message: 'Loại giảm giá không hợp lệ' })
    @IsNotEmpty({ message: 'Loại giảm giá không được để trống' })
    discountType!: DiscountType;

    @IsNumber({}, { message: 'Giá trị giảm giá phải là số' })
    @Min(0, { message: 'Giá trị giảm giá không được nhỏ hơn 0' })
    @IsNotEmpty({ message: 'Giá trị giảm giá không được để trống' })
    discountValue!: number;

    @IsNumber({}, { message: 'Giá trị đơn hàng tối thiểu phải là số' })
    @Min(0, { message: 'Giá trị đơn hàng tối thiểu không được nhỏ hơn 0' })
    @IsOptional()
    minOrderValue?: number;

    @IsUrl({}, { message: 'Đường dẫn hình ảnh không hợp lệ' })
    @IsNotEmpty({ message: 'Hình ảnh không được để trống' })
    image!: string;

    @IsOptional()
    @IsString({ message: 'Nhãn phải là chuỗi ký tự' })
    badge?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Ngày bắt đầu không hợp lệ' })
    startDate?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ' })
    endDate?: string;

    @IsOptional()
    @IsBoolean({ message: 'Trạng thái hoạt động phải là kiểu boolean' })
    isActive?: boolean;
}

export class UpdatePromotionDto {
    @IsOptional()
    @IsString({ message: 'Tiêu đề phải là chuỗi ký tự' })
    @MaxLength(200, { message: 'Tiêu đề không được vượt quá 200 ký tự' })
    title?: string;

    @IsOptional()
    @IsString({ message: 'Mô tả phải là chuỗi ký tự' })
    description?: string;

    @IsOptional()
    @IsString({ message: 'Mã ưu đãi phải là chuỗi ký tự' })
    @MaxLength(50, { message: 'Mã ưu đãi không được vượt quá 50 ký tự' })
    code?: string;

    @IsOptional()
    @IsEnum(DiscountType, { message: 'Loại giảm giá không hợp lệ' })
    discountType?: DiscountType;

    @IsOptional()
    @IsNumber({}, { message: 'Giá trị giảm giá phải là số' })
    @Min(0, { message: 'Giá trị giảm giá không được nhỏ hơn 0' })
    discountValue?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Giá trị đơn hàng tối thiểu phải là số' })
    @Min(0, { message: 'Giá trị đơn hàng tối thiểu không được nhỏ hơn 0' })
    minOrderValue?: number;

    @IsOptional()
    @IsUrl({}, { message: 'Đường dẫn hình ảnh không hợp lệ' })
    image?: string;

    @IsOptional()
    @IsString({ message: 'Nhãn phải là chuỗi ký tự' })
    badge?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Ngày bắt đầu không hợp lệ' })
    startDate?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ' })
    endDate?: string;

    @IsOptional()
    @IsBoolean({ message: 'Trạng thái hoạt động phải là kiểu boolean' })
    isActive?: boolean;
}
