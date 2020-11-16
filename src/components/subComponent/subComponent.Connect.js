import {connect} from 'react-redux';
import SubComponent from './subComponent';
import {fetchInitData} from '../../actions/sampleAction';
import {withRouter} from 'react-router-dom';
const mapStateToProps = (state) => {
    const {sampleReducer = {}} = state;
    return {
        initData: sampleReducer.initData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchInitData: (payload) => {
            dispatch(fetchInitData('', payload));
        }
    };
};

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubComponent));
export default connect(mapStateToProps, mapDispatchToProps)(SubComponent);
