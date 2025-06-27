import { memo, useState } from 'react'
import {
  IconSortAscending,
  IconSortDescending,
  IconSearch,
  IconArrowsSort
} from '@tabler/icons-react'
import {
  Table,
  TableThead,
  TableTbody,
  TableTr,
  TableTh,
  TableTd,
  TableScrollContainer,
  TextInput,
  Select,
  Pagination,
  Group,
  Box,
  Paper,
  Text,
  ActionIcon,
  LoadingOverlay
} from '@mantine/core'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table'

import type {
  TableProps,
  PaginationProps,
  LoadingOverlayProps,
  TableScrollContainerProps
} from '@mantine/core'
import type {
  ColumnDef,
  PaginationState,
  TableOptions,
  SortingState,
  ColumnFiltersState
} from '@tanstack/react-table'

import clsx from 'clsx'
import { AppEmpty } from './app-empty'

import classes from './app-table-module.module.css'

export type TAppTableModuleProps<T> = {
  data: T[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[]
  additionalTableOptions?: Omit<TableOptions<T>, 'data' | 'columns' | 'getCoreRowModel'>
  paginationOptions?: {
    rowsPerPageLabelClassName?: string
    rowsPerPageLabel?: string
    rowsPerPageOptions?: string[]
    pageSize?: number
    pageCount?: number
  }
  mantineTableProps?: TableProps
  mantinePaginationProps?: PaginationProps
  mantineLoadingOverlayProps?: LoadingOverlayProps
  mantineTableScrollContainerProps?: TableScrollContainerProps
  wrapperClassName?: string
  paperClassName?: string
  bottomToolbarClassName?: string
  isLoading?: boolean
  onPaginationChange?: (pagination: PaginationState) => void
  onSortingChange?: (sorting: SortingState) => void
  onFilteringChange?: (filtering: ColumnFiltersState) => void
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AppTableModuleComponent<T extends Record<string, any>>({
  data,
  columns,
  additionalTableOptions,
  paginationOptions,
  mantineTableProps,
  mantinePaginationProps,
  mantineLoadingOverlayProps,
  mantineTableScrollContainerProps,
  wrapperClassName,
  paperClassName,
  bottomToolbarClassName,
  isLoading,
  onPaginationChange,
  onSortingChange
}: TAppTableModuleProps<T>) {
  const {
    pageSize = 5,
    rowsPerPageOptions = ['5', '10'],
    pageCount,
    rowsPerPageLabel = 'Rows per page',
    rowsPerPageLabelClassName
  } = paginationOptions ?? {}

  console.log('AppTableModuleComponent RENDERED')

  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize })
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { pagination, sorting, globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: updater => {
      const newPaginationState = typeof updater === 'function' ? updater(pagination) : updater

      onPaginationChange?.(newPaginationState)
      setPagination(newPaginationState)
    },
    onSortingChange: updater => {
      const newSortingState = typeof updater === 'function' ? updater(sorting) : updater

      onSortingChange?.(newSortingState)
      setSorting(newSortingState)
    },
    onGlobalFilterChange: setGlobalFilter,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    ...additionalTableOptions
  })

  const rowModel = table.getRowModel()

  return (
    <Box className={clsx(wrapperClassName)}>
      {additionalTableOptions?.enableGlobalFilter && (
        <TextInput
          mb="xs"
          maw="30rem"
          placeholder="Search..."
          onChange={e => setGlobalFilter(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          size="sm"
        />
      )}

      <Paper
        radius="sm"
        withBorder
        style={{ position: 'relative', backgroundColor: '#2e2e2e' }}
        className={clsx(paperClassName)}
        shadow="xs"
      >
        <LoadingOverlay visible={isLoading} {...mantineLoadingOverlayProps} />

        <TableScrollContainer
          className={classes.tableScrollContainer}
          minWidth={800}
          {...mantineTableScrollContainerProps}
        >
          <Table
            layout="fixed"
            withRowBorders={false}
            withTableBorder={false}
            withColumnBorders={false}
            {...mantineTableProps}
          >
            <TableThead className={classes.tableHead}>
              {table.getHeaderGroups().map(headerGroup => (
                <TableTr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableTh
                      className={classes.tableTh}
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      <Group>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <ActionIcon
                            variant="subtle"
                            onClick={header.column.getToggleSortingHandler()}
                            aria-label="Toggle sort"
                          >
                            {!header.column.getIsSorted() && <IconArrowsSort size={16} />}
                            {header.column.getIsSorted() === 'asc' && (
                              <IconSortAscending size={16} />
                            )}
                            {header.column.getIsSorted() === 'desc' && (
                              <IconSortDescending size={16} />
                            )}
                          </ActionIcon>
                        )}
                      </Group>
                    </TableTh>
                  ))}
                </TableTr>
              ))}
            </TableThead>

            <TableTbody className={classes.tableBody}>
              {rowModel.rows.map(row => (
                <TableTr className={classes.tableTr} key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableTd key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableTd>
                  ))}
                </TableTr>
              ))}

              {!rowModel.rows.length && (
                <TableTr inert>
                  <TableTd colSpan={table.getHeaderGroups()[0]?.headers.length}>
                    <AppEmpty />
                  </TableTd>
                </TableTr>
              )}
            </TableTbody>
          </Table>
        </TableScrollContainer>

        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '15px',
            borderTop: '1px solid grey'
          }}
          className={clsx(bottomToolbarClassName)}
        >
          <Text mr="md" className={clsx(rowsPerPageLabelClassName)} size="sm" visibleFrom="xs">
            {rowsPerPageLabel}
          </Text>

          <Select
            mr="md"
            w="7rem"
            value={table.getState().pagination.pageSize.toString()}
            onChange={value => table.setPageSize(Number(value))}
            data={rowsPerPageOptions}
            disabled={!rowModel.rows.length}
            size="sm"
            visibleFrom="xs"
            allowDeselect={false}
          />

          {rowModel.rows.length > 0 && (
            <Text mr="md" size="sm">
              Page {pagination.pageIndex + 1} - {table.getPageCount()}
            </Text>
          )}

          <Pagination
            total={table.getPageCount()}
            value={pagination.pageIndex + 1}
            onChange={page => table.setPageIndex(page - 1)}
            size="sm"
            withPages={false}
            withEdges={true}
            {...mantinePaginationProps}
          />
        </Box>
      </Paper>
    </Box>
  )
}

export const AppTableModule = memo(AppTableModuleComponent) as typeof AppTableModuleComponent
