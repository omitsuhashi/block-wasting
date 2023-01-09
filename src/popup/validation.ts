import { z } from 'zod';

const HOUR_SCHEMA_ERROR_MESSAGE = '0以上23以下の数字が入力可能です';
export const HourSchema = z.number()
  .min(0, HOUR_SCHEMA_ERROR_MESSAGE)
  .max(23, HOUR_SCHEMA_ERROR_MESSAGE)
  .optional();
export const dummy = '';
