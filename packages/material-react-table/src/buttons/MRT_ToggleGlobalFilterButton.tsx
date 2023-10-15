import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { type MRT_RowData, type MRT_TableInstance } from '../types';

interface Props<TData extends MRT_RowData> extends IconButtonProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleGlobalFilterButton = <TData extends MRT_RowData>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { SearchIcon, SearchOffIcon },

      localization,
    },
    refs: { searchInputRef },
    setShowGlobalFilter,
  } = table;
  const { globalFilter, showGlobalFilter } = getState();

  const handleToggleSearch = () => {
    setShowGlobalFilter(!showGlobalFilter);
    queueMicrotask(() => searchInputRef.current?.focus());
  };

  return (
    <Tooltip arrow title={rest?.title ?? localization.showHideSearch}>
      <IconButton
        aria-label={rest?.title ?? localization.showHideSearch}
        disabled={!!globalFilter}
        onClick={handleToggleSearch}
        {...rest}
        title={undefined}
      >
        {showGlobalFilter ? <SearchOffIcon /> : <SearchIcon />}
      </IconButton>
    </Tooltip>
  );
};
