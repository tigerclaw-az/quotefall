export function PuzzleDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/puzzle/puzzle.tpl.html',
    scope: {
        creationDate: '='
    },
    controller: PuzzleController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class PuzzleController {
  constructor (moment) {
    'ngInject';

    // "this.creationDate" is available by directive option "bindToController: true"
    this.relativeDate = moment(this.creationDate).fromNow();
  }
}
