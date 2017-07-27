import * as React from 'react';
import * as CSSModules from 'react-css-modules';

import Perf from 'react-addons-perf';

import {ActionHandler} from '../../actions/redux-action';
import {ShelfAction} from '../../actions/shelf';
import {Bookmark} from '../../models/bookmark';
import {PlotObject} from '../../models/plot';
import {Plot} from '../plot';
import * as styles from './plot-list.scss';

export interface PlotListProps extends ActionHandler<ShelfAction> {
  plots: PlotObject[];
  bookmark: Bookmark;
}

export class PlotListBase extends React.PureComponent<PlotListProps, any> {
  public render() {
    const {plots, handleAction, bookmark} = this.props;

    Perf.start();
    const plotListItems = plots.map(plot => {
      const {spec, fieldInfos} = plot;
      return (
        <Plot
          key={JSON.stringify(spec)}
          fieldInfos={fieldInfos}
          handleAction={handleAction}
          isPlotListItem={true}
          scrollOnHover={true}
          showBookmarkButton={true}
          showSpecifyButton={true}
          spec={spec}
          bookmark={bookmark}
        />
      );
    });

    Perf.stop();
    Perf.printExclusive();

    return (
      <div styleName="plot-list">
        {plotListItems}
      </div>
    );
  }
}

export const PlotList = CSSModules(PlotListBase, styles);
