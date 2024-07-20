import { Skeleton } from "@/components/ui/skeleton"
import {
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export function TableSkeleton() {
  return (
      <TableBody>
        {[...Array(10)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </TableCell>
            <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            <TableCell><Skeleton className="h-6 w-[60px] rounded-full" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
  )
}